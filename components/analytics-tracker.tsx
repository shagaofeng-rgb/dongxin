"use client";

import {useEffect,useRef} from "react";
import {usePathname,useSearchParams} from "next/navigation";
import {trackEvent} from "@/lib/analytics";

export function AnalyticsTracker(){
  const pathname=usePathname();
  const searchParams=useSearchParams();
  const startedAt=useRef(Date.now());
  useEffect(()=>{
    if(pathname.startsWith("/admin")||pathname==="/login"||pathname.startsWith("/auth/"))return;
    startedAt.current=Date.now();
    const context={path:pathname,title:document.title};
    const query=searchParams.toString()||undefined;
    trackEvent("page_view",{query},context);
    let recorded=false;
    const leave=()=>{if(recorded)return;recorded=true;trackEvent("page_exit",{durationMs:Math.max(0,Date.now()-startedAt.current)},context);};
    const visibility=()=>{
      if(document.visibilityState==="hidden")leave();
      else if(recorded){startedAt.current=Date.now();recorded=false;trackEvent("page_view",{query},context);}
    };
    window.addEventListener("pagehide",leave);
    document.addEventListener("visibilitychange",visibility);
    return ()=>{leave();window.removeEventListener("pagehide",leave);document.removeEventListener("visibilitychange",visibility);};
  },[pathname,searchParams]);
  return null;
}
