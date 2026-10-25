import {NextResponse,type NextRequest} from "next/server";
import {createServerClient} from "@supabase/ssr";
import {safeNext} from "@/lib/admin";

export async function GET(request:NextRequest){
  const url=new URL(request.url);const code=url.searchParams.get("code");const next=safeNext(url.searchParams.get("next"));
  const siteUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!code||!siteUrl||!key)return NextResponse.redirect(new URL("/login",url.origin));
  const response=NextResponse.redirect(new URL(next,url.origin));
  const supabase=createServerClient(siteUrl,key,{cookies:{
    getAll(){return request.cookies.getAll();},
    setAll(cookies,headers){
      cookies.forEach(({name,value,options})=>response.cookies.set(name,value,options));
      Object.entries(headers).forEach(([name,value])=>response.headers.set(name,value));
    }
  }});
  const {error}=await supabase.auth.exchangeCodeForSession(code);
  if(error)return NextResponse.redirect(new URL("/login",url.origin));
  response.headers.set("Cache-Control","private, no-store");
  return response;
}
