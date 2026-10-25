"use client";

import Link from "next/link";
import {useMemo,useState} from "react";
import {CaretLeft,CaretRight} from "@phosphor-icons/react";
import {EmptyData} from "@/components/admin/admin-shell";
import {displayCategory} from "@/lib/admin-locale";

type Item={name:string;slug:string;category:string;summary?:string;specifications?:number};

export function ContentTable({items,type}:{items:Item[];type:"products"|"blog"}){
  const [draft,setDraft]=useState("");const [query,setQuery]=useState("");const [category,setCategory]=useState("");const [page,setPage]=useState(1);
  const categories=useMemo(()=>Array.from(new Set(items.map(item=>item.category))).sort(),[items]);
  const filtered=useMemo(()=>items.filter(item=>(!category||item.category===category)&&(!query||`${item.name} ${item.slug} ${item.summary||""}`.toLowerCase().includes(query.toLowerCase()))),[items,category,query]);
  const pageSize=20;const pages=Math.max(1,Math.ceil(filtered.length/pageSize));const visible=filtered.slice((page-1)*pageSize,page*pageSize);
  function search(){setQuery(draft.trim());setPage(1);}
  return <><section className="admin-panel admin-table-panel"><div className="admin-table-tools"><label className="admin-search"><span className="sr-only">搜索内容</span><input value={draft} onChange={event=>setDraft(event.target.value)} onKeyDown={event=>{if(event.key==="Enter")search();}} placeholder={type==="products"?"搜索产品名称或型号":"搜索文章标题或摘要"}/><button type="button" onClick={search}>搜索</button></label><label className="admin-filter">分类<select value={category} onChange={event=>{setCategory(event.target.value);setPage(1);}}><option value="">全部分类</option>{categories.map(value=><option value={value} key={value}>{displayCategory(value)}</option>)}</select></label></div><div className="admin-table-wrap">{visible.length?<table><thead><tr><th>{type==="products"?"产品":"文章"}</th><th>分类</th><th>{type==="products"?"参数项":"摘要"}</th><th>操作</th></tr></thead><tbody>{visible.map(item=><tr key={item.slug}><td><b>{item.name}</b><small>/{item.slug}</small></td><td>{displayCategory(item.category)}</td><td>{type==="products"?`${item.specifications||0} 项`:item.summary||"—"}</td><td><Link className="admin-view-button" href={type==="products"?`/products/${item.slug}`:`/blog/${item.slug}`} target="_blank" rel="noopener noreferrer">查看官网页面 ↗</Link></td></tr>)}</tbody></table>:<EmptyData title="没有符合条件的内容" description="请调整搜索或分类条件。"/>}</div></section><div className="admin-pagination"><p>共 {filtered.length} 条记录</p><div><button type="button" disabled={page<=1} onClick={()=>setPage(value=>value-1)} aria-label="上一页"><CaretLeft size={18}/></button><span>第 {page} / {pages} 页</span><button type="button" disabled={page>=pages} onClick={()=>setPage(value=>value+1)} aria-label="下一页"><CaretRight size={18}/></button></div></div></>;
}
