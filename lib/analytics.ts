"use client";

export type AnalyticsEventType="page_view"|"page_exit"|"whatsapp_click"|"form_started"|"form_submit"|"cta_click";

const VISITOR_KEY="dxrv_visitor_id";
const SESSION_KEY="dxrv_session_id";

function idFor(key:string,storage:Storage){
  const existing=storage.getItem(key);
  if(existing)return existing;
  const id=crypto.randomUUID();
  storage.setItem(key,id);
  return id;
}

export function getAnalyticsIdentity(){
  if(typeof window==="undefined")return null;
  try{return {visitorId:idFor(VISITOR_KEY,window.localStorage),sessionId:idFor(SESSION_KEY,window.sessionStorage)};}
  catch{return null;}
}

export function trackEvent(eventType:AnalyticsEventType,metadata:Record<string,unknown>={},context?:{path:string;title:string}){
  const identity=getAnalyticsIdentity();
  if(!identity)return;
  const payload=JSON.stringify({
    ...identity,
    eventType,
    path:context?.path||window.location.pathname,
    title:context?.title||document.title,
    referrer:document.referrer||undefined,
    metadata:{...metadata,source:document.referrer||"Direct"}
  });
  try{
    const sent=navigator.sendBeacon("/api/analytics/event",new Blob([payload],{type:"application/json"}));
    if(sent)return;
  }catch{/* Fetch fallback below. */}
  void fetch("/api/analytics/event",{method:"POST",headers:{"content-type":"application/json"},body:payload,keepalive:true}).catch(()=>{});
}

export async function submitInquiry(formType:string,fields:Record<string,FormDataEntryValue>){
  const identity=getAnalyticsIdentity();
  const response=await fetch("/api/inquiries",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({formType,fields,visitorId:identity?.visitorId,sessionId:identity?.sessionId,path:window.location.pathname,referrer:document.referrer,email:fields["email-address"],name:fields["first-name"],company:fields.company||fields["company-name"],country:fields.country})}).catch(()=>new Response(null,{status:503}));
  if(response.ok)trackEvent("form_submit",{formType});
  return response;
}
