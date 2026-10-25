"use client";

import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useState} from "react";
import {ArrowRight,ChartBar,ChartLineUp,ChatCircleDots,Clock,DeviceMobile,EnvelopeSimple,Eye,FileText,FolderSimple,House,LinkSimple,List,SignOut,Tray,Users,WarningCircle,WhatsappLogo,X} from "@phosphor-icons/react";
import {createBrowserSupabaseClient} from "@/lib/supabase/browser";

const navigation=[
  {href:"/admin",label:"数据总览",icon:House},
  {href:"/admin/analytics",label:"流量分析",icon:ChartLineUp},
  {href:"/admin/inquiries",label:"客户询盘",icon:ChatCircleDots},
  {href:"/admin/whatsapp",label:"WhatsApp 点击",icon:LinkSimple},
  {href:"/admin/visitors",label:"访客记录",icon:Users},
  {href:"/admin/journeys",label:"访问轨迹",icon:ArrowRight},
  {href:"/admin/content/products",label:"产品内容",icon:FolderSimple},
  {href:"/admin/content/blog",label:"新闻与文章",icon:FileText}
];

export function AdminShell({children,user}:{children:React.ReactNode;user:{email:string;name:string}}){
  const pathname=usePathname();const router=useRouter();const [open,setOpen]=useState(false);
  useEffect(()=>{if(!open)return;function onKeyDown(event:KeyboardEvent){if(event.key==="Escape")setOpen(false);}window.addEventListener("keydown",onKeyDown);return()=>window.removeEventListener("keydown",onKeyDown);},[open]);
  async function signOut(){await createBrowserSupabaseClient().auth.signOut();router.replace("/login");router.refresh();}
  return <div className="admin-app">
    <aside className="admin-sidebar">
      <header className="admin-masthead"><div className="admin-masthead-inner">
        <Link className="admin-brand" href="/admin" aria-label="东鑫机械网站管理后台首页" onClick={()=>setOpen(false)}><strong>东鑫机械</strong><span>DONGXIN MACHINERY</span></Link>
        <button className="admin-menu-button" type="button" aria-expanded={open} aria-controls="admin-navigation" aria-label={open?"关闭导航":"打开导航"} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<List size={22}/>}</button>
      </div></header>
      <nav id="admin-navigation" className={`admin-navigation ${open?"is-open":""}`} aria-label="后台导航"><div className="admin-navigation-inner">{navigation.map(item=>{const Icon=item.icon;const selected=item.href==="/admin"?pathname==="/admin":pathname.startsWith(item.href);return <Link className={selected?"active":""} href={item.href} key={item.href} aria-current={selected?"page":undefined} onClick={()=>setOpen(false)}><Icon size={20} weight={selected?"fill":"regular"}/><span>{item.label}</span></Link>;})}<div className="admin-mobile-account"><span>{user.name}<small>{user.email}</small></span><button type="button" onClick={signOut}><SignOut size={18}/>退出登录</button></div></div></nav>
      <div className="admin-account"><span className="admin-account-avatar"><Users size={22}/></span><div><b>{user.name}</b><small>{user.email}</small></div><button type="button" onClick={signOut} aria-label="退出登录" title="退出登录"><SignOut size={18}/></button></div>
    </aside>
    {open?<button type="button" className="admin-backdrop" aria-label="关闭导航" onClick={()=>setOpen(false)}/>:null}
    <main className="admin-main" id="admin-main">{children}</main>
  </div>;
}

export function AdminPageHeader({title,description,actions}:{eyebrow?:string;title:string;description?:string;actions?:React.ReactNode}){return <header className="admin-page-header"><div><h1>{title}</h1>{description?<p>{description}</p>:null}</div>{actions?<div className="admin-header-actions">{actions}</div>:null}</header>;}

function MetricIcon({label}:{label:string}){
  if(label.includes("WhatsApp"))return <WhatsappLogo size={24} weight="regular"/>;
  if(label.includes("询盘"))return <EnvelopeSimple size={24} weight="regular"/>;
  if(label.includes("访客"))return <Users size={24} weight="regular"/>;
  if(label.includes("手机"))return <DeviceMobile size={24} weight="regular"/>;
  if(label.includes("停留"))return <Clock size={24} weight="regular"/>;
  if(label.includes("浏览")||label.includes("访问"))return <Eye size={24} weight="regular"/>;
  if(label.includes("文章"))return <FileText size={24} weight="regular"/>;
  if(label.includes("产品"))return <FolderSimple size={24} weight="regular"/>;
  return <ChartBar size={24} weight="regular"/>;
}

export function MetricCard({label,value,detail,tone="blue"}:{label:string;value:string;detail?:string;tone?:"blue"|"orange"|"slate"}){return <section className={`admin-metric admin-metric-${tone}`}><div className="admin-metric-top"><span className="admin-metric-icon"><MetricIcon label={label}/></span><p>{label}</p></div><strong>{value}</strong>{detail?<small>{detail}</small>:null}</section>;}

export function EmptyData({title="该时间段暂无数据",description="请选择其他时间范围查看。"}:{title?:string;description?:string}){return <div className="admin-empty">{title.includes("询盘")?<Tray size={34}/>:<WarningCircle size={28}/>}<div><b>{title}</b><p>{description}</p></div></div>;}

export function MiniTrend({points,metric="visits",label="页面浏览量"}:{points:{date:string;visits:number;inquiries:number;whatsapp:number}[];metric?:"visits"|"inquiries"|"whatsapp";label?:string}){
  const max=Math.max(1,...points.map(point=>point[metric]));const ceiling=Math.ceil(max/4)*4;const width=680;const height=220;const top=14;const bottom=24;const chartHeight=height-top-bottom;const step=points.length>1?width/(points.length-1):0;
  const coords=points.map((point,index)=>({x:points.length===1?width/2:index*step,y:top+chartHeight-(point[metric]/ceiling)*chartHeight}));
  const ticks=Array.from({length:5},(_,index)=>ceiling-(ceiling/4)*index);
  const line=coords.map(point=>`${point.x},${point.y}`).join(" ");
  const area=coords.length?`M${coords[0].x} ${top+chartHeight} L${coords.map(point=>`${point.x} ${point.y}`).join(" L")} L${coords.at(-1)?.x} ${top+chartHeight} Z`:"";
  return <div className="admin-trend"><div className="admin-trend-legend"><span><i/>{label}</span><span>按日统计 · 中国时间</span></div><div className="admin-trend-plot"><div className="admin-trend-ticks" aria-hidden="true">{ticks.map(tick=><span key={tick}>{tick}</span>)}</div><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`${label}趋势图，${points[0]?.date||""}至${points.at(-1)?.date||""}`}>{ticks.map((tick,index)=><path key={tick} d={`M0 ${top+(chartHeight/4)*index}H${width}`} className="admin-gridline"/>)}<path d={area} className="admin-trend-area"/><polyline points={line} className="admin-trend-line"/>{coords.map((point,index)=><circle key={points[index].date} cx={point.x} cy={point.y} r="4" className="admin-trend-dot"/>)}</svg></div><div className="admin-trend-axis"><span>{points[0]?.date||""}</span><span>{points.at(-1)?.date||""}</span></div><details className="admin-chart-data"><summary>查看每日数据</summary><table><thead><tr><th>日期</th><th>{label}</th></tr></thead><tbody>{points.map(point=><tr key={point.date}><td>{point.date}</td><td>{point[metric]}</td></tr>)}</tbody></table></details></div>;
}
