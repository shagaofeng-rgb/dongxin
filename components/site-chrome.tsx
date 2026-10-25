"use client";

import {usePathname} from "next/navigation";
import {Suspense} from "react";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {WhatsAppFloat} from "@/components/whatsapp-float";
import {AnalyticsTracker} from "@/components/analytics-tracker";

export function SiteChrome({children}:{children:React.ReactNode}){
  const pathname=usePathname();
  const isPrivateSurface=pathname.startsWith("/admin")||pathname==="/login";
  if(isPrivateSurface)return <>{children}</>;
  return <><SiteHeader/><main id="main-content">{children}</main><SiteFooter/><WhatsAppFloat/><Suspense fallback={null}><AnalyticsTracker/></Suspense></>;
}
