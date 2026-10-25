import {NextResponse} from "next/server";
import {createAdminSupabaseClient} from "@/lib/supabase/server";

const uuid=(value:unknown)=>typeof value==="string"&&/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value);
const value=(input:unknown,max=300)=>typeof input==="string"?input.trim().slice(0,max):"";

export async function POST(request:Request){
  const supabase=createAdminSupabaseClient();if(!supabase)return NextResponse.json({error:"Submission service is currently unavailable."},{status:503});
  const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:"Invalid origin"},{status:403});
  let body:Record<string,unknown>;try{const raw=await request.text();if(raw.length>32_000)return NextResponse.json({error:"Submission is too large."},{status:413});body=JSON.parse(raw);if(!body||typeof body!=="object"||Array.isArray(body))throw new Error("Invalid submission");}catch{return NextResponse.json({error:"Invalid form submission."},{status:400});}
  const fields:Record<string,unknown>=body.fields&&typeof body.fields==="object"&&!Array.isArray(body.fields)?body.fields as Record<string,unknown>:{};
  if(Object.keys(fields).length>80||Object.entries(fields).some(([key,field])=>key.length>100||typeof field!=="string"||field.length>4_000))return NextResponse.json({error:"Invalid form fields."},{status:400});
  const email=value(body.email||fields["email-address"],254).toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(email))return NextResponse.json({error:"Enter a valid email address."},{status:400});
  const visitorId=uuid(body.visitorId)?String(body.visitorId):null;
  const sessionId=visitorId&&uuid(body.sessionId)?String(body.sessionId):null;
  if(visitorId){
    const visitor=await supabase.from("visitor_profiles").upsert({visitor_id:visitorId},{onConflict:"visitor_id",ignoreDuplicates:true});
    if(visitor.error)return NextResponse.json({error:"Unable to save your submission."},{status:500});
  }
  if(sessionId){
    const session=await supabase.from("visitor_sessions").upsert({id:sessionId,visitor_id:visitorId,landing_path:value(body.path,250)||"/",referrer:value(body.referrer,500)||null},{onConflict:"id",ignoreDuplicates:true});
    if(session.error)return NextResponse.json({error:"Unable to save your submission."},{status:500});
  }
  const {error}=await supabase.from("inquiries").insert({
    visitor_id:visitorId,session_id:sessionId,form_type:value(body.formType,60)||"contact",name:value(body.name||fields["first-name"],160)||null,email,company:value(body.company||fields.company||fields["company-name"],160)||null,country:value(body.country||fields.country,100)||null,payload:fields,status:"new"
  });
  if(error)return NextResponse.json({error:"Unable to save your submission."},{status:500});
  return NextResponse.json({ok:true},{status:201});
}
