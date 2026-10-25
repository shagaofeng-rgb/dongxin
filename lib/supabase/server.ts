import {createServerClient} from "@supabase/ssr";
import {createClient} from "@supabase/supabase-js";
import {cookies} from "next/headers";

function getPublicConfig(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url&&key?{url,key}:null;
}

export function isSupabaseConfigured(){return Boolean(getPublicConfig());}

export async function createServerSupabaseClient(){
  const config=getPublicConfig();
  if(!config)return null;
  const cookieStore=await cookies();
  return createServerClient(config.url,config.key,{cookies:{
    getAll(){return cookieStore.getAll();},
    setAll(cookiesToSet){try{cookiesToSet.forEach(({name,value,options})=>cookieStore.set(name,value,options));}catch{/* Server Components cannot write cookies. proxy.ts refreshes sessions. */}}
  }});
}

export function createAdminSupabaseClient(){
  const config=getPublicConfig();
  const serviceRole=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!config||!serviceRole)return null;
  return createClient(config.url,serviceRole,{auth:{autoRefreshToken:false,persistSession:false}});
}
