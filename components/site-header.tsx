"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
import {brand,industries} from "@/lib/catalogue";
import {Icon} from "./site-icon";
const navigation=[
 {label:"Valves",href:"/products",children:[["All Rotary Valves","/products"],...industries.map(i=>[i.name,`/solutions/${i.slug}`])]},
 {label:"Valve Options",href:"/options",children:["Rotors","Kits","Accessories","Conveying Equipment"].map(label=>[label,`/options?category=${encodeURIComponent(label)}`])},
 {label:"View in 3D",href:"/models",children:[["Valve Gallery","/models"],["Rotor Gallery","/models?type=rotors"]]},
 {label:"About",href:"/about",children:[["The Company","/about#company"],["The People","/about#people"],["The Facilities","/about#facilities"]]},
 {label:"Resources",href:"/resources",children:[["Videos","/resources/videos"],["Downloads","/resources/downloads"],["Technical Drawings","/resources/technical-drawings"],["Valve Sizing Tool","/sizing"],["Glossary","/resources/glossary"]]},
 {label:"Blog",href:"/blog",children:[["All Blogs","/blog"],["Events","/blog?category=Events"]]},
 {label:"Tech Support",href:"/support",children:[["All Support","/support"],["Videos","/support?category=Videos"],["FAQs","/support?category=FAQs"],["Articles","/support?category=Articles"]]},
];
export function SiteHeader(){
 const path=usePathname();
 const [submenu,setSubmenu]=useState<string|null>(null);
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[contrast,setContrast]=useState(false);
 useEffect(()=>{document.documentElement.classList.toggle("high-contrast",contrast);},[contrast]);
 function close(){setMenu(false);setSearch(false);setSubmenu(null);}
 return <><a className="skip-link" href="#main-content">Skip to main content</a><header className="site-header" onKeyDown={e=>{if(e.key==="Escape")close();}}>
 <Link href="/" className="brand" aria-label={`${brand.name} home`} onClick={close}><strong>{brand.shortName}</strong><span>{brand.descriptor}</span></Link>
 <nav className="utility-nav" aria-label="Site tools"><button aria-label="Toggle high contrast" aria-pressed={contrast} onClick={()=>setContrast(!contrast)}><Icon name="contrast"/></button><Link href="/contact/representatives" onClick={close}>Locate a Rep</Link><Link href="/quote" onClick={close}>Request a Quote</Link><Link href="/contact" onClick={close}>Contact Us</Link><Link className="utility-contact" href="/contact" onClick={close}><Icon name="phone"/> TALK TO OUR TEAM</Link></nav>
 <div className="header-actions"><Link className="mobile-contact" href="/contact" aria-label="Contact our team" onClick={close}><Icon name="phone"/></Link><button className="search-toggle" aria-label="Open search" aria-expanded={search} aria-controls="header-search" onClick={()=>{setSearch(!search);setMenu(false);}}><Icon name={search?"close":"search"}/></button><button className="menu-toggle" aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} aria-controls="main-navigation" onClick={()=>{setMenu(!menu);setSearch(false);}}><Icon name={menu?"close":"menu"}/></button></div>
 <nav id="main-navigation" className={`primary-nav ${menu?"is-open":""}`} aria-label="Main navigation">{navigation.map(item=><div className={`nav-item ${submenu===item.href?"submenu-open":""}`} key={item.href}><Link href={item.href} onClick={close} className={path.startsWith(item.href)?"active":""}><span className="nav-label">{item.label}</span></Link><button className="nav-submenu-toggle" aria-label={`Toggle ${item.label} submenu`} aria-expanded={submenu===item.href} aria-controls={`submenu-${item.href.slice(1)}`} onClick={()=>setSubmenu(submenu===item.href?null:item.href)}><Icon name="down"/></button><div className="nav-dropdown" id={`submenu-${item.href.slice(1)}`}>{item.children.map(([label,href])=><Link href={href} key={href} onClick={close}>{label}</Link>)}</div></div>)}</nav>
 {search?<form id="header-search" className="header-search" action="/products" onSubmit={close}><label className="sr-only" htmlFor="global-search">Search the product catalogue</label><input id="global-search" name="q" type="search" placeholder="Search valves, options and resources" autoFocus/><button className="button" type="submit"><Icon name="search"/> Search</button></form>:null}
 </header></>;
}
