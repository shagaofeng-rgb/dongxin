import {redirect} from "next/navigation";
import {createServerSupabaseClient,isSupabaseConfigured} from "@/lib/supabase/server";

export type DateRangePreset="today"|"7d"|"30d"|"custom";
export type DateRange={preset:DateRangePreset;from:string;to:string;label:string};

export function dateKey(value:Date){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(value);
  const part=(type:string)=>parts.find(item=>item.type===type)?.value||"";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function offsetDate(key:string,days:number){
  const value=new Date(`${key}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate()+days);
  return value.toISOString().slice(0,10);
}

function chinaStart(key:string){return new Date(`${key}T00:00:00+08:00`);}

export function getDateRange(input?:Partial<{preset:string;from:string;to:string}>):DateRange{
  const now=new Date();
  const preset:DateRangePreset=input?.preset==="today"||input?.preset==="7d"||input?.preset==="30d"||input?.preset==="custom"?input.preset:"7d";
  const validKey=(value:string)=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
    const parsed=new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.valueOf())&&parsed.toISOString().slice(0,10)===value;
  };
  if(preset==="custom"&&input?.from&&input?.to&&validKey(input.from)&&validKey(input.to)&&input.from<=input.to&&chinaStart(input.to).valueOf()-chinaStart(input.from).valueOf()<=365*86_400_000){
    return {preset,from:chinaStart(input.from).toISOString(),to:new Date(chinaStart(offsetDate(input.to,1)).valueOf()-1).toISOString(),label:`${input.from} — ${input.to}`};
  }
  const today=dateKey(now);
  const days=preset==="7d"?7:preset==="30d"?30:1;
  const first=offsetDate(today,1-days);
  return {preset:preset==="custom"?"today":preset,from:chinaStart(first).toISOString(),to:new Date(chinaStart(offsetDate(today,1)).valueOf()-1).toISOString(),label:days===1?"今天":`近 ${days} 天`};
}

export async function requireAdmin(){
  if(!isSupabaseConfigured())redirect("/login");
  const supabase=await createServerSupabaseClient();
  const {data:{user}}=await supabase!.auth.getUser();
  if(!user)redirect("/login");
  const {data:profile}=await supabase!.from("admin_profiles").select("id,role,display_name").eq("id",user.id).maybeSingle();
  if(!profile)redirect("/login?access=restricted");
  const displayName=profile.display_name==="Website Administrator"?"网站管理员":profile.display_name;
  return {id:user.id,email:user.email||"",name:displayName||user.email||"管理员",role:profile.role};
}

export function safeNext(value:string|null){return value&&value.startsWith("/admin")&&!value.startsWith("//")?value:"/admin";}

export function formatNumber(value:number){return new Intl.NumberFormat("zh-CN").format(value);}

export function formatDuration(milliseconds:number){
  const seconds=Math.round(milliseconds/1000);
  if(seconds<60)return `${seconds} 秒`;
  return `${Math.floor(seconds/60)} 分 ${seconds%60} 秒`;
}

export function formatDate(value:string){return new Intl.DateTimeFormat("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(value));}

export function rangeKeys(range:DateRange){
  const output:string[]=[];
  let cursor=dateKey(new Date(range.from));
  const end=dateKey(new Date(range.to));
  while(cursor<=end){output.push(cursor);cursor=offsetDate(cursor,1);}
  return output;
}
