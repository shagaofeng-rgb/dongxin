import type {Metadata,Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./tools.css";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
const siteFont=localFont({src:"../public/media/site-typeface.ttf",display:"swap",variable:"--font-site",weight:"100 900"});
export const metadata:Metadata={title:{default:"Dongxin Machinery",template:"%s | Dongxin Machinery"},description:"Rotary valves, material handling and application support."};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#327fc2"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={siteFont.variable}><body><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>;}
