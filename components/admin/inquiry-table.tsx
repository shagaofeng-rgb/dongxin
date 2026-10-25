"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {CaretLeft,CaretRight,Eye,Spinner} from "@phosphor-icons/react";
import {formatDate,formatDateKey,formatDuration,formatNumber} from "@/lib/admin-format";
import {EmptyData} from "@/components/admin/admin-shell";
import {displayEvent,displayField,displayFormType,displayStatus} from "@/lib/admin-locale";

type Row={id:string;created_at:string;name:string|null;email:string|null;company:string|null;country:string|null;status:string;form_type:string;visitor_id:string|null};
type Result={items:Row[];total:number;page:number;pageSize:number;totalPages:number};
type Detail={inquiry:Row&{payload:Record<string,unknown>;session_id:string|null;internal_note:string|null};events:{event_type:string;pathname:string;occurred_at:string;duration_ms:number|null;metadata:Record<string,unknown>|null}[]};
const pageSizes=[20,50,100];

export function InquiryTable({range}:{range:{preset:string;from:string;to:string}}){
  const [result,setResult]=useState<Result>({items:[],total:0,page:1,pageSize:20,totalPages:1});
  const [status,setStatus]=useState("");const [query,setQuery]=useState("");const [draft,setDraft]=useState("");
  const [loading,setLoading]=useState(true);const [error,setError]=useState("");const [retry,setRetry]=useState(0);
  const [detail,setDetail]=useState<Detail|null>(null);const [detailLoading,setDetailLoading]=useState(false);const [detailError,setDetailError]=useState("");
  const triggerRef=useRef<HTMLButtonElement|null>(null);
  const params=useMemo(()=>new URLSearchParams({preset:range.preset,from:formatDateKey(range.from),to:formatDateKey(range.to),status,query,page:String(result.page),pageSize:String(result.pageSize)}),[range.preset,range.from,range.to,status,query,result.page,result.pageSize]);
  useEffect(()=>{const controller=new AbortController();setLoading(true);setError("");void fetch(`/api/admin/inquiries?${params}`,{cache:"no-store",signal:controller.signal}).then(response=>response.ok?response.json():Promise.reject()).then((next:Result)=>setResult(next)).catch(()=>{if(!controller.signal.aborted)setError("询盘记录暂时无法读取，请重试。");}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return ()=>controller.abort();},[params,retry]);
  function search(){setQuery(draft);setResult(current=>({...current,page:1}));}
  function page(value:number){setResult(current=>({...current,page:Math.max(1,Math.min(value,current.totalPages))}));}
  async function open(id:string,button:HTMLButtonElement){triggerRef.current=button;setDetail(null);setDetailError("");setDetailLoading(true);try{const response=await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`,{cache:"no-store"});if(!response.ok)throw new Error();setDetail(await response.json());}catch{setDetailError("询盘详情暂时无法读取，请重试。");}finally{setDetailLoading(false);}}
  function close(){setDetail(null);setDetailError("");setDetailLoading(false);triggerRef.current?.focus();}
  return <>
    <section className="admin-panel admin-table-panel"><div className="admin-table-tools"><label className="admin-search"><span className="sr-only">搜索询盘</span><input value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==="Enter")search();}} placeholder="搜索姓名、邮箱或公司"/><button type="button" onClick={search}>搜索</button></label><label className="admin-filter">状态<select value={status} onChange={event=>{setStatus(event.target.value);setResult(current=>({...current,page:1}));}}><option value="">全部状态</option><option value="new">新询盘</option><option value="reviewing">跟进中</option><option value="qualified">有效询盘</option><option value="closed">已关闭</option></select></label></div>
      <div className="admin-table-wrap" aria-busy={loading}>{loading?<div className="admin-table-loading"><Spinner size={22}/>正在更新记录…</div>:error?<div className="admin-inline-error" role="alert"><span>{error}</span><button type="button" onClick={()=>setRetry(value=>value+1)}>重新加载</button></div>:result.items.length?<table><thead><tr><th>提交时间</th><th>联系人</th><th>公司</th><th>国家 / 地区</th><th>表单类型</th><th>状态</th><th>操作</th></tr></thead><tbody>{result.items.map(item=><tr key={item.id}><td>{formatDate(item.created_at)}</td><td><b>{item.name||"—"}</b><small>{item.email||""}</small></td><td>{item.company||"—"}</td><td>{item.country||"—"}</td><td><span className="admin-type-chip">{displayFormType(item.form_type)}</span></td><td><span className={`admin-status ${item.status}`}>{displayStatus(item.status)}</span></td><td><button type="button" className="admin-view-button" onClick={event=>void open(item.id,event.currentTarget)}><Eye size={18}/>查看</button></td></tr>)}</tbody></table>:<EmptyData title="没有符合条件的询盘" description="请选择其他时间或调整筛选条件。"/>}</div>
    </section>
    <div className="admin-pagination"><p>共 {formatNumber(result.total)} 条记录</p><div><label>每页<select value={result.pageSize} onChange={event=>setResult(current=>({...current,pageSize:Number(event.target.value),page:1}))}>{pageSizes.map(size=><option value={size} key={size}>{size}</option>)}</select></label><button type="button" disabled={loading||result.page<=1} onClick={()=>page(result.page-1)} aria-label="上一页"><CaretLeft size={18}/></button><span>第 {result.page} / {result.totalPages} 页</span><button type="button" disabled={loading||result.page>=result.totalPages} onClick={()=>page(result.page+1)} aria-label="下一页"><CaretRight size={18}/></button></div></div>
    {detail||detailLoading||detailError?<InquiryDrawer detail={detail} loading={detailLoading} error={detailError} onClose={close}/>:null}
  </>;
}

function InquiryDrawer({detail,loading,error,onClose}:{detail:Detail|null;loading:boolean;error:string;onClose:()=>void}){
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{closeRef.current?.focus();const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose();if(event.key==="Tab"){event.preventDefault();closeRef.current?.focus();}};window.addEventListener("keydown",onKey);return ()=>window.removeEventListener("keydown",onKey);},[onClose]);
  return <div className="admin-drawer-layer"><button className="admin-drawer-backdrop" type="button" onClick={onClose} aria-label="关闭询盘详情"/><aside className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="inquiry-detail-title"><button ref={closeRef} className="admin-drawer-close" type="button" onClick={onClose}>关闭</button>{loading?<div className="admin-drawer-loading"><Spinner size={24}/>正在加载询盘…</div>:error?<div className="admin-inline-error" role="alert">{error}</div>:detail?<><header><p>询盘详情</p><h2 id="inquiry-detail-title">{detail.inquiry.name||"网站询盘"}</h2><span>{formatDate(detail.inquiry.created_at)}</span></header><section><h3>联系信息</h3><dl className="admin-detail-grid"><div><dt>邮箱</dt><dd>{detail.inquiry.email||"—"}</dd></div><div><dt>公司</dt><dd>{detail.inquiry.company||"—"}</dd></div><div><dt>国家 / 地区</dt><dd>{detail.inquiry.country||"—"}</dd></div><div><dt>表单类型</dt><dd>{displayFormType(detail.inquiry.form_type)}</dd></div></dl></section><section><h3>提交内容</h3><dl className="admin-detail-grid">{Object.entries(detail.inquiry.payload||{}).filter(([,value])=>typeof value==="string"&&value).map(([key,value])=><div key={key}><dt>{displayField(key)}</dt><dd>{String(value)}</dd></div>)}</dl></section><section><h3>关联访问轨迹</h3>{detail.events.length?<ol className="admin-journey-list">{detail.events.map((event,index)=><li key={`${event.occurred_at}-${index}`}><time>{formatDate(event.occurred_at)}</time><b>{displayEvent(event.event_type)}</b><span>{event.pathname}{event.duration_ms!==null?` · ${formatDuration(event.duration_ms)}`:""}</span></li>)}</ol>:<EmptyData title="暂无关联的会话记录" description="未能关联到同一访问会话的浏览事件。"/>}</section></>:null}</aside></div>;
}
