"use client";

import {createBrowserClient} from "@supabase/ssr";

function getBrowserConfig(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url&&key?{url,key}:null;
}

export function isBrowserSupabaseConfigured(){return Boolean(getBrowserConfig());}

export function createBrowserSupabaseClient(){
  const config=getBrowserConfig();
  if(!config)throw new Error("Account service is unavailable.");
  return createBrowserClient(config.url,config.key);
}
