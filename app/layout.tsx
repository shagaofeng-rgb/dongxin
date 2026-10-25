import type {Metadata,Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./tools.css";
import {SiteChrome} from "@/components/site-chrome";
const siteFont=localFont({src:"../public/media/site-typeface.ttf",display:"swap",variable:"--font-site",weight:"100 900"});
export const metadata:Metadata={metadataBase:new URL("https://qzdxrv.com"),title:{default:"Dongxin Machinery",template:"%s | Dongxin Machinery"},description:"Rotary valves, material handling and application support.",openGraph:{type:"website",siteName:"Dongxin Machinery",locale:"en_US"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#327fc2"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={siteFont.variable}><body><SiteChrome>{children}</SiteChrome></body></html>;}
