"use client";

import {usePathname,useRouter,useSearchParams} from "next/navigation";
import {useState} from "react";
import {CalendarBlank} from "@phosphor-icons/react";

const presets=[{value:"today",label:"今天"},{value:"7d",label:"近 7 天"},{value:"30d",label:"近 30 天"},{value:"custom",label:"自定义"}];
export function DateRangeControl(){
  const router=useRouter();const pathname=usePathname();const search=useSearchParams();const [preset,setPreset]=useState(search.get("preset")||"7d");const [from,setFrom]=useState(search.get("from")||"");const [to,setTo]=useState(search.get("to")||"");const [error,setError]=useState("");
  function apply(){if(preset==="custom"&&(!from||!to||from>to)){setError("请选择有效的开始和结束日期。");return;}if(preset==="custom"&&(new Date(to).valueOf()-new Date(from).valueOf())>365*86_400_000){setError("单次查询最多选择 366 天。");return;}setError("");const params=new URLSearchParams(search.toString());params.set("preset",preset);if(preset==="custom"){params.set("from",from);params.set("to",to);}else{params.delete("from");params.delete("to");}router.push(`${pathname}?${params.toString()}`);}
  return <div className="admin-date-range"><div className="admin-presets">{presets.map(item=><button type="button" className={preset===item.value?"active":""} aria-pressed={preset===item.value} onClick={()=>{setPreset(item.value);setError("");}} key={item.value}>{item.label}</button>)}</div>{preset==="custom"?<div className="admin-custom-dates"><label>开始日期<input type="date" value={from} onChange={event=>setFrom(event.target.value)}/></label><label>结束日期<input type="date" value={to} onChange={event=>setTo(event.target.value)}/></label><button type="button" onClick={apply}>应用筛选</button></div>:<button className="admin-range-apply" type="button" onClick={apply}><CalendarBlank size={17}/>应用</button>}{error?<p className="admin-range-error" role="alert">{error}</p>:null}</div>;
}
