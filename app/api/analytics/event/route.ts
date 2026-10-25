import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {createAdminSupabaseClient} from "@/lib/supabase/server";

const types=new Set(["page_view","page_exit","whatsapp_click","form_started","form_submit","cta_click"]);
const isUuid=(value:unknown)=>typeof value==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const text=(value:unknown,max:number)=>typeof value==="string"?value.slice(0,max):"";

export async function POST(request:Request){
  const supabase=createAdminSupabaseClient();if(!supabase)return NextResponse.json({error:"Analytics service unavailable"},{status:503});
  const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});
  let payload:Record<string,unknown>;try{const raw=await request.text();if(raw.length>12_000)return NextResponse.json({error:"Event too large"},{status:413});payload=JSON.parse(raw);if(!payload||typeof payload!=="object"||Array.isArray(payload))throw new Error("Invalid payload");}catch{return NextResponse.json({error:"Invalid request"},{status:400});}
  if(!types.has(String(payload.eventType))||!isUuid(payload.visitorId)||!isUuid(payload.sessionId)||!text(payload.path,250).startsWith("/"))return NextResponse.json({error:"Invalid event"},{status:400});
  const headerList=await headers(); const country=text(headerList.get("x-vercel-ip-country"),4)||null; const userAgent=text(headerList.get("user-agent"),400).toLowerCase();if(/bot|crawler|spider|headless|lighthouse|pagespeed|curl|wget/.test(userAgent))return new Response(null,{status:204});const device=userAgent.includes("tablet")||userAgent.includes("ipad")?"tablet":userAgent.includes("mobile")?"mobile":"desktop";
  const metadata=payload.metadata&&typeof payload.metadata==="object"&&!Array.isArray(payload.metadata)?payload.metadata:{};
  if(JSON.stringify(metadata).length>2_000)return NextResponse.json({error:"Event metadata too large"},{status:413});
  const now=new Date().toISOString();const visitorId=String(payload.visitorId);const sessionId=String(payload.sessionId);
  const visitor=await supabase.from("visitor_profiles").upsert({visitor_id:visitorId,last_seen_at:now,...(country?{country}:{}),device_type:device},{onConflict:"visitor_id"});
  if(visitor.error)return NextResponse.json({error:"Unable to record event"},{status:500});
  const session=await supabase.from("visitor_sessions").upsert({id:sessionId,visitor_id:visitorId,last_seen_at:now,ended_at:now,landing_path:text(payload.path,250),referrer:text(payload.referrer,500)||null,country,device_type:device},{onConflict:"id",ignoreDuplicates:true});
  if(session.error)return NextResponse.json({error:"Unable to record event"},{status:500});
  const sessionUpdate=await supabase.from("visitor_sessions").update({last_seen_at:now,ended_at:now,...(country?{country}:{}),device_type:device}).eq("id",sessionId).eq("visitor_id",visitorId);
  if(sessionUpdate.error)return NextResponse.json({error:"Unable to record event"},{status:500});
  const durationMs=payload.eventType==="page_exit"?Math.min(Math.max(Number((metadata as Record<string,unknown>).durationMs)||0,0),86_400_000):null;
  const event=await supabase.from("analytics_events").insert({visitor_id:visitorId,session_id:sessionId,event_type:payload.eventType,pathname:text(payload.path,250),page_title:text(payload.title,250)||null,referrer:text(payload.referrer,500)||null,duration_ms:durationMs,country,device_type:device,metadata});
  if(event.error)return NextResponse.json({error:"Unable to record event"},{status:500});
  return NextResponse.json({ok:true},{status:201});
}
