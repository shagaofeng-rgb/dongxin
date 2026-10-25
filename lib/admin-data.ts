import {dateKey,getDateRange,rangeKeys,type DateRange} from "@/lib/admin";
import {createAdminSupabaseClient} from "@/lib/supabase/server";

type EventRecord={event_type:string;pathname:string;visitor_id:string;session_id:string;occurred_at:string;duration_ms:number|null;referrer:string|null;country:string|null;metadata:Record<string,unknown>|null};
export type TrendPoint={date:string;visits:number;inquiries:number;whatsapp:number};
export type DashboardData={metrics:{pageViews:number;visitors:number;sessions:number;inquiries:number;whatsapp:number;whatsappSessions:number;averageDuration:number;durationSamples:number};trend:TrendPoint[];topPages:{path:string;views:number}[];sources:{name:string;count:number}[];countries:{code:string;count:number}[]};

const batchSize=1000;
function database(){
  const client=createAdminSupabaseClient();
  if(!client)throw new Error("数据服务未配置");
  return client;
}

function emptyDashboard(range:DateRange):DashboardData{return {metrics:{pageViews:0,visitors:0,sessions:0,inquiries:0,whatsapp:0,whatsappSessions:0,averageDuration:0,durationSamples:0},trend:rangeKeys(range).map(date=>({date,visits:0,inquiries:0,whatsapp:0})),topPages:[],sources:[],countries:[]};}

function sourceName(value:string|null){
  if(!value)return "直接访问";
  try{const host=new URL(value).hostname.toLowerCase();return host==="qzdxrv.com"||host==="www.qzdxrv.com"?"站内跳转":host;}
  catch{return "其他来源";}
}
function eventSource(event:EventRecord){
  const query=event.metadata?.query;
  if(typeof query==="string"){
    const source=new URLSearchParams(query).get("utm_source")?.trim().slice(0,80);
    if(source)return `UTM: ${source}`;
  }
  return sourceName(event.referrer);
}

export async function getDashboardData(rangeInput?:Partial<{preset:string;from:string;to:string}>):Promise<{range:DateRange;data:DashboardData}>{
  const range=getDateRange(rangeInput);const supabase=database();
  const [events,inquiries]=await Promise.all([
    (async()=>{const items:EventRecord[]=[];for(let offset=0;;){
      const {data,count,error}=await supabase.from("analytics_events").select("event_type,pathname,visitor_id,session_id,occurred_at,duration_ms,referrer,country,metadata",{count:"exact"}).gte("occurred_at",range.from).lte("occurred_at",range.to).order("occurred_at",{ascending:true}).order("id",{ascending:true}).range(offset,offset+batchSize-1);
      if(error)throw new Error("访问数据查询失败");
      if(count===null||(!data?.length&&offset<count))throw new Error("访问数据读取不完整");
      items.push(...(data||[]) as EventRecord[]);offset+=data?.length||0;
      if(offset>=count)return items;
    }})(),
    (async()=>{const items:{id:string;created_at:string}[]=[];for(let offset=0;;){
      const {data,count,error}=await supabase.from("inquiries").select("id,created_at",{count:"exact"}).gte("created_at",range.from).lte("created_at",range.to).order("created_at",{ascending:true}).order("id",{ascending:true}).range(offset,offset+batchSize-1);
      if(error)throw new Error("询盘数据查询失败");
      if(count===null||(!data?.length&&offset<count))throw new Error("询盘数据读取不完整");
      items.push(...(data||[]));offset+=data?.length||0;
      if(offset>=count)return items;
    }})()
  ]);
  const data=emptyDashboard(range);const points=new Map(data.trend.map(point=>[point.date,point]));
  const visitors=new Set<string>();const sessions=new Set<string>();const whatsappSessions=new Set<string>();const paths=new Map<string,number>();const sources=new Map<string,number>();const countries=new Map<string,number>();const attributedSessions=new Set<string>();let durationTotal=0;let durationCount=0;
  for(const event of events){
    const point=points.get(dateKey(new Date(event.occurred_at)));
    if(event.event_type==="page_view"){
      visitors.add(event.visitor_id);sessions.add(event.session_id);
      data.metrics.pageViews+=1;
      paths.set(event.pathname,(paths.get(event.pathname)||0)+1);
      if(point)point.visits+=1;
      if(!attributedSessions.has(event.session_id)){
        attributedSessions.add(event.session_id);
        const source=eventSource(event);
        sources.set(source,(sources.get(source)||0)+1);
        const country=event.country||"未知";
        countries.set(country,(countries.get(country)||0)+1);
      }
    }
    if(event.event_type==="whatsapp_click"){
      data.metrics.whatsapp+=1;whatsappSessions.add(event.session_id);
      if(point)point.whatsapp+=1;
    }
    if(event.event_type==="page_exit"&&event.duration_ms!==null){durationTotal+=event.duration_ms;durationCount+=1;}
  }
  for(const inquiry of inquiries){data.metrics.inquiries+=1;const point=points.get(dateKey(new Date(inquiry.created_at)));if(point)point.inquiries+=1;}
  data.metrics.visitors=visitors.size;data.metrics.sessions=sessions.size;data.metrics.whatsappSessions=whatsappSessions.size;
  data.metrics.averageDuration=durationCount?Math.round(durationTotal/durationCount):0;
  data.metrics.durationSamples=durationCount;
  data.topPages=Array.from(paths,([path,views])=>({path,views})).sort((a,b)=>b.views-a.views).slice(0,6);
  data.sources=Array.from(sources,([name,count])=>({name,count})).sort((a,b)=>b.count-a.count).slice(0,5);
  data.countries=Array.from(countries,([code,count])=>({code,count})).sort((a,b)=>b.count-a.count).slice(0,8);
  return {range,data};
}

export type InquirySummary={id:string;created_at:string;name:string|null;email:string|null;company:string|null;country:string|null;status:string;form_type:string;visitor_id:string|null};
const safePageSize=(value:number)=>[20,50,100].includes(value)?value:20;
const safePage=(value:number)=>Number.isFinite(value)?Math.max(1,Math.min(100000,Math.floor(value))):1;
const safeSearch=(value:string)=>value.trim().slice(0,100).replace(/[%,().]/g,"");

export async function getInquiryPage({page=1,pageSize=20,status="",country="",query="",rangeInput}:{page?:number;pageSize?:number;status?:string;country?:string;query?:string;rangeInput?:Partial<{preset:string;from:string;to:string}>}){
  const range=getDateRange(rangeInput);const supabase=database();const size=safePageSize(pageSize);const current=safePage(page);
  let request=supabase.from("inquiries").select("id,created_at,name,email,company,country,status,form_type,visitor_id",{count:"exact"}).gte("created_at",range.from).lte("created_at",range.to).order("created_at",{ascending:false}).range((current-1)*size,current*size-1);
  if(status)request=request.eq("status",status);if(country)request=request.eq("country",country);
  const search=safeSearch(query);if(search)request=request.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
  const {data,count,error}=await request;
  if(error)throw new Error("询盘列表查询失败");
  const total=count||0;return {range,items:(data||[]) as InquirySummary[],total,page:current,pageSize:size,totalPages:Math.max(1,Math.ceil(total/size))};
}

export async function getInquiryDetail(id:string){
  const supabase=database();
  const {data:inquiry,error}=await supabase.from("inquiries").select("*").eq("id",id).maybeSingle();
  if(error)throw new Error("询盘详情查询失败");
  if(!inquiry)return null;
  const events:Omit<EventRecord,"visitor_id"|"session_id"|"referrer"|"country">[]=[];
  if(inquiry.session_id){
    for(let offset=0;;){
      const {data,count,error:eventError}=await supabase.from("analytics_events").select("event_type,pathname,occurred_at,duration_ms,metadata",{count:"exact"}).eq("session_id",inquiry.session_id).order("occurred_at",{ascending:true}).range(offset,offset+batchSize-1);
      if(eventError)throw new Error("关联轨迹查询失败");
      if(count===null||(!data?.length&&offset<count))throw new Error("关联轨迹读取不完整");
      events.push(...(data||[]));offset+=data?.length||0;if(offset>=count)break;
    }
  }
  return {inquiry,events:events.map(event=>event.event_type==="page_exit"?event:{...event,duration_ms:null})};
}

export type VisitorSession={id:string;visitor_id:string;started_at:string;last_seen_at:string;ended_at:string|null;landing_path:string;referrer:string|null;country:string|null;device_type:string|null};
export async function getVisitorSessionPage({page=1,pageSize=20,device="",query="",rangeInput}:{page?:number;pageSize?:number;device?:string;query?:string;rangeInput?:Partial<{preset:string;from:string;to:string}>}){
  const range=getDateRange(rangeInput);const supabase=database();const size=safePageSize(pageSize);const current=safePage(page);
  let request=supabase.from("visitor_sessions").select("id,visitor_id,started_at,last_seen_at,ended_at,landing_path,referrer,country,device_type",{count:"exact"}).gte("started_at",range.from).lte("started_at",range.to).order("started_at",{ascending:false}).range((current-1)*size,current*size-1);
  if(["desktop","mobile","tablet"].includes(device))request=request.eq("device_type",device);
  const search=safeSearch(query);if(search)request=request.ilike("landing_path",`%${search}%`);
  const {data,count,error}=await request;
  if(error)throw new Error("访客记录查询失败");
  const items=(data||[]) as VisitorSession[];
  const firstPages=new Map<string,string>();
  if(items.length){
    for(let offset=0;;){
      const {data:pageEvents,count:eventCount,error:eventError}=await supabase.from("analytics_events").select("session_id,pathname,occurred_at",{count:"exact"}).in("session_id",items.map(item=>item.id)).eq("event_type","page_view").order("occurred_at",{ascending:true}).range(offset,offset+batchSize-1);
      if(eventError)throw new Error("访客进入页面查询失败");
      if(eventCount===null||(!pageEvents?.length&&offset<eventCount))throw new Error("访客进入页面读取不完整");
      for(const event of pageEvents||[])if(!firstPages.has(event.session_id))firstPages.set(event.session_id,event.pathname);
      offset+=pageEvents?.length||0;if(offset>=eventCount)break;
    }
  }
  const total=count||0;return {range,items:items.map(item=>({...item,landing_path:firstPages.get(item.id)||item.landing_path})),total,page:current,pageSize:size,totalPages:Math.max(1,Math.ceil(total/size))};
}

export async function getVisitorDetail(id:string){
  const supabase=database();
  const {data:session,error}=await supabase.from("visitor_sessions").select("id,visitor_id,started_at,last_seen_at,ended_at,landing_path,referrer,country,device_type").eq("id",id).maybeSingle();
  if(error)throw new Error("访客详情查询失败");
  if(!session)return null;
  const events:Omit<EventRecord,"visitor_id"|"session_id"|"referrer"|"country">[]=[];
  for(let offset=0;;){
    const {data,count,error:eventError}=await supabase.from("analytics_events").select("event_type,pathname,occurred_at,duration_ms,metadata",{count:"exact"}).eq("session_id",id).order("occurred_at",{ascending:true}).range(offset,offset+batchSize-1);
    if(eventError)throw new Error("访问轨迹查询失败");
    if(count===null||(!data?.length&&offset<count))throw new Error("访问轨迹读取不完整");
    events.push(...(data||[]));offset+=data?.length||0;if(offset>=count)break;
  }
  const {data:inquiries,error:inquiryError}=await supabase.from("inquiries").select("id,created_at,form_type").eq("session_id",id).order("created_at",{ascending:false});
  if(inquiryError)throw new Error("关联询盘查询失败");
  const firstPage=events.find(event=>event.event_type==="page_view")?.pathname;
  return {session:{...session,landing_path:firstPage||session.landing_path},events:events.map(event=>event.event_type==="page_exit"?event:{...event,duration_ms:null}),inquiries:inquiries||[]};
}
