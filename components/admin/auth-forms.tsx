"use client";

import Link from "next/link";
import Image from "next/image";
import {useRouter,useSearchParams} from "next/navigation";
import {useState,type FormEvent} from "react";
import {ArrowRight,Eye,EyeSlash,LockKey,EnvelopeSimple} from "@phosphor-icons/react";
import {createBrowserSupabaseClient,isBrowserSupabaseConfigured} from "@/lib/supabase/browser";

function AuthFrame({title,description,children}:{title:string;description:string;children:React.ReactNode}){
  return <main className="admin-auth" lang="zh-CN">
    <section className="admin-auth-visual" aria-label="东鑫机械网站管理">
      <Image className="admin-auth-photo" src="/media/workshop-hero.png" alt="" fill priority sizes="(max-width: 900px) 100vw, 56vw"/>
      <div className="admin-auth-photo-shade" aria-hidden="true"/>
      <div className="admin-auth-brand"><span className="admin-auth-brandmark">D<span>.</span></span><span className="admin-auth-brandname"><strong>DONGXIN</strong><small>MACHINERY</small></span></div>
      <div className="admin-auth-story"><h1>网站运营<br/>尽在掌握。</h1><p>集中查看网站流量、客户询盘与每一次访问背后的详细数据。</p></div>
      <div className="admin-auth-visual-footer"><span>网站运营管理</span><span>浙江 · 衢州</span></div>
    </section>
    <section className="admin-auth-panel">
      <div className="admin-auth-panel-top"><span>DX / 网站管理</span><span className="admin-auth-access"><i/>仅限授权人员</span></div>
      <div className="admin-auth-card"><div className="admin-auth-heading"><div className="admin-auth-lock"><LockKey size={23} weight="light"/></div><h2>{title}</h2><p>{description}</p></div>{children}</div>
      <p className="admin-auth-panel-foot">DONGXIN MACHINERY <span>© {new Date().getFullYear()}</span></p>
    </section>
  </main>;
}

function Notice({message,kind="error"}:{message:string;kind?:"error"|"success"}){return <p className={`admin-notice ${kind}`} role="status">{message}</p>;}

export function LoginForm(){
  const router=useRouter();const search=useSearchParams();const [show,setShow]=useState(false);const [message,setMessage]=useState("");const [loading,setLoading]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage("");if(!isBrowserSupabaseConfigured()){setMessage("账号服务暂时不可用，请稍后重试。");return;}const data=new FormData(event.currentTarget);setLoading(true);const {error}=await createBrowserSupabaseClient().auth.signInWithPassword({email:String(data.get("email")),password:String(data.get("password"))});setLoading(false);if(error){setMessage("邮箱或密码不正确。");return;}router.replace("/admin");router.refresh();}
  return <AuthFrame title="欢迎回来" description="登录后查看网站运营数据。"><form className="admin-auth-form" onSubmit={submit}><label>邮箱地址<input name="email" type="email" autoComplete="email" placeholder="请输入邮箱地址" required/></label><div className="admin-password-field"><div className="admin-field-heading"><label htmlFor="admin-password">密码</label><Link href="/admin/forgot-password" className="admin-text-action">忘记密码？</Link></div><div className="admin-password-input"><input id="admin-password" name="password" type={show?"text":"password"} autoComplete="current-password" placeholder="请输入密码" required/><button type="button" onClick={()=>setShow(!show)} aria-label={show?"隐藏密码":"显示密码"}>{show?<EyeSlash size={19}/>:<Eye size={19}/>}</button></div></div>{search.get("access")==="restricted"?<Notice message="当前账号没有后台访问权限。"/>:null}{message?<Notice message={message}/>:null}<button className="admin-primary-button" disabled={loading}><span>{loading?"正在登录…":"登录管理后台"}</span><ArrowRight size={20}/></button></form></AuthFrame>;
}

export function ForgotPasswordForm(){
  const [message,setMessage]=useState("");const [sent,setSent]=useState(false);const [loading,setLoading]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage("");if(!isBrowserSupabaseConfigured()){setMessage("账号服务暂时不可用，请稍后重试。");return;}setLoading(true);const email=String(new FormData(event.currentTarget).get("email"));const origin=window.location.origin;const {error}=await createBrowserSupabaseClient().auth.resetPasswordForEmail(email,{redirectTo:`${origin}/auth/callback?next=/admin/reset-password`});setLoading(false);if(error){setMessage("重置邮件发送失败，请稍后重试。");return;}setSent(true);}
  return <AuthFrame title="找回密码" description="输入管理员邮箱，我们会发送密码重置链接。"><form className="admin-auth-form" onSubmit={submit}><label>邮箱地址<div className="admin-email-input"><EnvelopeSimple size={19}/><input name="email" type="email" autoComplete="email" required/></div></label>{message?<Notice message={message}/>:null}{sent?<Notice kind="success" message="如果该邮箱已注册，密码重置链接将发送至该邮箱。"/>:null}<button className="admin-primary-button" disabled={loading}>{loading?"正在发送…":"发送重置链接"}</button><Link href="/login" className="admin-text-action">返回登录</Link></form></AuthFrame>;
}

export function ResetPasswordForm(){
  const router=useRouter();const [message,setMessage]=useState("");const [done,setDone]=useState(false);const [loading,setLoading]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setMessage("");const data=new FormData(event.currentTarget);const password=String(data.get("password"));const confirmation=String(data.get("confirmation"));if(password.length<10){setMessage("密码至少需要 10 个字符。");return;}if(password!==confirmation){setMessage("两次输入的密码不一致。");return;}if(!isBrowserSupabaseConfigured()){setMessage("账号服务暂时不可用，请稍后重试。");return;}setLoading(true);const {error}=await createBrowserSupabaseClient().auth.updateUser({password});setLoading(false);if(error){setMessage("重置链接已失效，请重新申请。");return;}setDone(true);window.setTimeout(()=>router.replace("/admin"),900);}
  return <AuthFrame title="设置新密码" description="请为管理员账号设置安全密码。"><form className="admin-auth-form" onSubmit={submit}><label>新密码<input name="password" type="password" autoComplete="new-password" required/></label><label>确认新密码<input name="confirmation" type="password" autoComplete="new-password" required/></label>{message?<Notice message={message}/>:null}{done?<Notice kind="success" message="密码已更新，正在进入管理后台…"/>:null}<button className="admin-primary-button" disabled={loading}>{loading?"正在更新…":"更新密码"}</button></form></AuthFrame>;
}
