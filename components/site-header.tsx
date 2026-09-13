"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {brand,industries} from "@/lib/catalogue";
import {Icon} from "./site-icon";

type MegaLink={label:string;href:string;icon?:string};
type MegaGroup={title:string;links:MegaLink[]};
type MegaAction={title:string;href:string;action:string;icon:string;kicker?:string};
type MegaFeature={title:string;href:string;action:string;image:string;video?:boolean};
type NavItem={
 key:string;
 label:string;
 href:string;
 layout?:"standard"|"wide"|"editorial";
 groupPlacement?:"left"|"middle";
 mobileDirect?:boolean;
 intro:{title:string;action:string;icon:string};
 groups?:MegaGroup[];
 actions?:MegaAction[];
 highlight?:MegaAction;
 contact?:{title:string;phone:string;email:string};
 featuredTitle?:string;
 featured?:MegaFeature[];
};

const systemLinks:MegaLink[]=[
 {label:"Bulk Material",href:"/products?system=Bulk%20Material",icon:"bulk"},
 {label:"Dust Collector",href:"/products?system=Dust%20Collector",icon:"dust"},
 {label:"Pneumatic Conveying",href:"/products?system=Pneumatic%20Conveying",icon:"conveying"},
];
const industryLinks:MegaLink[]=["pet-food-industry","chemical-industry","food-industry","plastics-industry","construction-industry","pharmaceutical-cosmetics-industry"].map(slug=>{
 const item=industries.find(industry=>industry.slug===slug)!;
 return {label:item.name,href:`/solutions/${item.slug}`,icon:item.icon};
});

const navigation:NavItem[]=[
 {
  key:"valves",label:"Valves",href:"/products",groupPlacement:"middle",
  intro:{title:"Browse our Valves",action:"See all valves",icon:"grid"},
  actions:[
   {title:"View rotary valve technical drawings",href:"/resources/technical-drawings",action:"Browse drawings",icon:"downloadAlt"},
   {title:"Size your valve in 3 easy steps",href:"/sizing",action:"Try the sizing tool",icon:"sizing"},
  ],
  groups:[
   {title:"By Industry",links:industryLinks},
   {title:"By System",links:systemLinks},
   {title:"By Type",links:[{label:"Airlock with Metering",href:"/products"},{label:"Metering and Feeding",href:"/products"},{label:"Rotary Airlock",href:"/products"}]},
  ],
  featuredTitle:"Featured Valves",
  featured:[
   {title:'12-inch Multi-Port Series',href:"/products/12-inch-multi-port-series",action:"See the valve",image:"/media/valve-26.webp"},
   {title:"MD Series with Quick-Clean",href:"/products/md-series-with-quick-clean",action:"See the valve",image:"/media/valve-05.webp"},
  ],
 },
 {
  key:"options",label:"Valve Options",href:"/options",
  intro:{title:"Browse our Options",action:"See all options",icon:"grid"},
  groups:[{title:"Types of Rotary Valve Options",links:[{label:"Rotors",href:"/options?category=Rotors"},{label:"Kits",href:"/options?category=Kits"},{label:"Accessories",href:"/options?category=Accessories"},{label:"Conveying Equipment",href:"/options?category=Conveying%20Equipment"}]}],
  actions:[
   {title:"Your rotary valve accessory guide",kicker:"Blog",href:"/blog/which-parts-of-a-rotary-valve-are-customizable",action:"Read the blog",icon:"document"},
   {title:"A guide to all types of rotors",kicker:"PDF",href:"/resources/downloads",action:"Download the guide",icon:"downloadAlt"},
   {title:"How material flows through a rotor",kicker:"Video",href:"/resources/videos",action:"Watch now",icon:"play"},
  ],
  featuredTitle:"Featured Options",
  featured:[
   {title:"Flex Tip Style Rotor",href:"/options/flex-tip-style-rotor",action:"See the rotor",image:"/media/rotor-02.webp"},
   {title:"Reduced Volume Rotor",href:"/options/reduced-volume-rotor",action:"See the rotor",image:"/media/rotor-07.webp"},
  ],
 },
 {
  key:"models",label:"View in 3D",href:"/models",layout:"wide",mobileDirect:true,
  intro:{title:"View valves in our 3D gallery",action:"Visit the 3D gallery",icon:"model"},
  featuredTitle:"Popular 3D Models",
  featured:[
   {title:"MD Series with Quick-Clean",href:"/models",action:"View in 3D",image:"/media/valve-05.webp"},
   {title:"CI Series",href:"/models",action:"View in 3D",image:"/media/valve-02.webp"},
   {title:"XTR-CI Series",href:"/models",action:"View in 3D",image:"/media/valve-06.webp"},
   {title:"BT Series",href:"/models",action:"View in 3D",image:"/media/valve-14.webp"},
  ],
 },
 {
  key:"about",label:"About Us",href:"/about",
  intro:{title:"See what makes our company tick",action:"Read about Dongxin",icon:"grid"},
  groups:[{title:"About Dongxin",links:[{label:"The Company",href:"/about#company"},{label:"The People",href:"/about#people"},{label:"The Facilities",href:"/about#facilities"},{label:"Experts",href:"/blog"},{label:"Careers",href:"/contact"}]}],
  highlight:{title:"Learn about careers at Dongxin",kicker:"Careers",href:"/contact",action:"Work with us",icon:"person"},
  actions:[
   {title:"Strong roots in material conveying",kicker:"The Company",href:"/about#company",action:"Learn about us",icon:"play"},
   {title:"First-rate talent here to help you",kicker:"The People",href:"/about#people",action:"Meet our people",icon:"sizing"},
   {title:"Equipped to build high-quality valves",kicker:"The Facilities",href:"/about#facilities",action:"See where we work",icon:"support"},
  ],
  featuredTitle:"Featured Video",
  featured:[{title:"Inside Dongxin valve production",href:"/resources/videos",action:"Watch now",image:"/media/workshop-hero.png",video:true}],
 },
 {
  key:"resources",label:"Resources",href:"/resources",
  intro:{title:"Browse our resource library",action:"See all resources",icon:"grid"},
  groups:[
   {title:"Downloads",links:[{label:"All Downloads",href:"/resources/downloads"},{label:"Technical Drawings",href:"/resources/technical-drawings"},{label:"Datasheets",href:"/resources/downloads"},{label:"Literature",href:"/resources/downloads"}]},
   {title:"Glossary",links:[{label:"All Terms",href:"/resources/glossary"},{label:"Valves",href:"/resources/glossary"},{label:"Parts",href:"/resources/glossary"},{label:"Materials",href:"/resources/glossary"}]},
  ],
  actions:[
   {title:"Visit our full video library",href:"/resources/videos",action:"Start watching",icon:"play"},
   {title:"Size your valve in 3 easy steps",href:"/sizing",action:"Try the sizing tool",icon:"sizing"},
   {title:"Technical answers for your application",href:"/support",action:"View support resources",icon:"support"},
  ],
  featuredTitle:"Featured Videos",
  featured:[
   {title:"Explore rotary valve components",href:"/resources/videos",action:"Watch now",image:"/media/rotor-01.webp",video:true},
   {title:"Quick-clean valve walkthrough",href:"/resources/videos",action:"Watch now",image:"/media/valve-05.webp",video:true},
  ],
 },
 {
  key:"blog",label:"Blog",href:"/blog",layout:"editorial",
  intro:{title:"Visit our blog",action:"Visit the blog",icon:"grid"},
  groups:[
   {title:"Blog",links:[{label:"All Articles",href:"/blog"},{label:"Quick Cleaning",href:"/blog?category=Quick%20Cleaning"},{label:"Customization",href:"/blog?category=Customization"},{label:"Maintenance",href:"/blog?category=Maintenance"}]},
   {title:"FAQs",links:[{label:"All FAQs",href:"/support?category=FAQs"},{label:"Technical Support",href:"/support?category=FAQs"},{label:"Safety",href:"/support?category=FAQs"},{label:"Reliability",href:"/support?category=FAQs"}]},
  ],
  featuredTitle:"Recent Blogs",
  featured:[
   {title:"Where can you use a quick-cleaning rotary valve?",href:"/blog/where-can-you-use-a-quick-cleaning-rotary-valve",action:"Read more",image:"/media/valve-05.webp"},
   {title:"Which parts of a rotary valve are customizable?",href:"/blog/which-parts-of-a-rotary-valve-are-customizable",action:"Read more",image:"/media/rotor-06.webp"},
   {title:"How to choose a rotor for your application",href:"/blog/how-to-choose-a-rotor-for-your-application",action:"Read more",image:"/media/rotor-02.webp"},
   {title:"A closer look at rotary valve maintenance",href:"/blog/a-closer-look-at-rotary-valve-maintenance",action:"Read more",image:"/media/valve-06.webp"},
  ],
 },
 {
  key:"support",label:"Tech Support",href:"/support",
  intro:{title:"Visit our tech support section",action:"View tech support",icon:"grid"},
  groups:[{title:"Tech Support Sections",links:[{label:"Videos",href:"/support?category=Videos"},{label:"Technical Drawings",href:"/support?category=Tech%20Drawings"},{label:"FAQs",href:"/support?category=FAQs"},{label:"Articles",href:"/support?category=Articles"}]}],
  contact:{title:"Contact our tech support team",phone:"Talk to our team",email:"Send an inquiry"},
  actions:[
   {title:"View rotary valve technical drawings",href:"/resources/technical-drawings",action:"Browse drawings",icon:"downloadAlt"},
   {title:"How is a high quality valve made?",href:"/blog",action:"Read the blog",icon:"question"},
   {title:"Our most common questions, answered",href:"/support?category=FAQs",action:"Browse FAQs",icon:"support"},
  ],
  featuredTitle:"Featured Video",
  featured:[{title:"A valve configured to fit",href:"/resources/videos",action:"Watch now",image:"/media/valve-19.webp",video:true}],
 },
];

function MenuIntro({item,close}:{item:NavItem;close:()=>void}){
 return <Link className="mega-intro" href={item.href} onClick={close}><span className="mega-icon mega-icon-solid"><Icon name={item.intro.icon}/></span><span><b>{item.intro.title}</b><small>{item.intro.action} <Icon name="right"/></small></span></Link>;
}

function MenuGroups({groups=[],close}:{groups?:MegaGroup[];close:()=>void}){
 return <div className="mega-groups">{groups.map(group=><section key={group.title}><strong>{group.title}</strong><div className="mega-link-grid">{group.links.map(link=><Link href={link.href} key={`${group.title}-${link.label}`} onClick={close}>{link.icon?<span className={`mega-mini-icon mega-mini-icon-${link.icon}`}><Icon name={link.icon}/></span>:null}<span>{link.label}</span></Link>)}</div></section>)}</div>;
}

function MenuActions({actions=[],close}:{actions?:MegaAction[];close:()=>void}){
 return <div className="mega-actions" data-desktop-only="true">{actions.map(action=><Link href={action.href} className="mega-action" key={action.title} onClick={close}><span className="mega-icon"><Icon name={action.icon}/></span><span>{action.kicker?<small className="mega-kicker">{action.kicker}</small>:null}<b>{action.title}</b><small>{action.action} <Icon name="right"/></small></span></Link>)}</div>;
}

function FeaturedCards({title,items=[],wide=false,close}:{title?:string;items?:MegaFeature[];wide?:boolean;close:()=>void}){
 return <div className={`mega-featured ${wide?"mega-featured-wide":""}`} data-desktop-only="true"><div className="mega-featured-heading"><Icon name="star"/>{title}</div><div className="mega-featured-cards">{items.map(item=><Link href={item.href} className="mega-feature-card" key={item.title} onClick={close}><span className="mega-feature-image"><Image src={item.image} alt="" fill sizes={wide?"20vw":"14vw"}/>{item.video?<span className="mega-play"><Icon name="play"/></span>:null}</span><b>{item.title}</b><small>{item.action} <Icon name="right"/></small></Link>)}</div></div>;
}

function MegaMenu({item,close}:{item:NavItem;close:()=>void}){
 const groupsLeft=item.groupPlacement!=="middle";
 const wide=item.layout==="wide"||item.layout==="editorial";
 return <div className={`mega-menu mega-menu-${item.layout??"standard"}`}>
  <div className="mega-column mega-column-left">
   <MenuIntro item={item} close={close}/>
   {groupsLeft?<MenuGroups groups={item.groups} close={close}/>:null}
   {item.highlight?<Link className="mega-highlight" href={item.highlight.href} onClick={close}><span className="mega-icon"><Icon name={item.highlight.icon}/></span><span><small className="mega-kicker">{item.highlight.kicker}</small><b>{item.highlight.title}</b><small>{item.highlight.action} <Icon name="right"/></small></span></Link>:null}
   {item.contact?<div className="mega-contact"><strong>{item.contact.title}</strong><div><Link href="/contact" onClick={close}><Icon name="phone"/><span>{item.contact.phone}</span></Link><Link href="/contact" onClick={close}><Icon name="email"/><span>{item.contact.email}</span></Link></div></div>:null}
   {!groupsLeft?<MenuActions actions={item.actions} close={close}/>:null}
  </div>
  {!wide?<div className={`mega-column ${item.groupPlacement==="middle"?"mega-column-groups":"mega-column-actions"}`}>{item.groupPlacement==="middle"?<MenuGroups groups={item.groups} close={close}/>:<MenuActions actions={item.actions} close={close}/>}</div>:null}
  <div className={`mega-column mega-column-featured ${wide?"mega-column-wide":""}`}><FeaturedCards title={item.featuredTitle} items={item.featured} wide={wide} close={close}/></div>
 </div>;
}

export function SiteHeader(){
 const path=usePathname();
 const [submenu,setSubmenu]=useState<string|null>(null);
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[compact,setCompact]=useState(false),[contrast,setContrast]=useState(false);
 useEffect(()=>{const onScroll=()=>setCompact(window.scrollY>90);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
 useEffect(()=>{document.documentElement.classList.toggle("high-contrast",contrast);return()=>document.documentElement.classList.remove("high-contrast");},[contrast]);
 useEffect(()=>{setMenu(false);setSearch(false);setSubmenu(null);},[path]);
 function close(){setMenu(false);setSearch(false);setSubmenu(null);}
 return <><a className="skip-link" href="#main-content">Skip to main content</a><header className={`site-header ${compact?"is-compact":""}`} onKeyDown={event=>{if(event.key==="Escape")close();}}>
  <Link href="/" className="brand" aria-label={`${brand.name} home`} onClick={close}><strong>{brand.shortName}</strong><span>{brand.descriptor}</span></Link>
  <nav className="utility-nav" aria-label="Site tools"><button aria-label="Toggle high contrast" aria-pressed={contrast} onClick={()=>setContrast(!contrast)}><Icon name="contrast"/></button><Link href="/contact/representatives" onClick={close}>Locate a Rep</Link><Link href="/quote" onClick={close}>Request a Quote</Link><Link href="/contact" onClick={close}>Contact Us</Link><Link className="utility-contact" href="/contact" onClick={close}><Icon name="phone"/> TALK TO OUR TEAM</Link></nav>
  <div className="header-actions"><Link className="mobile-contact" href="/contact" aria-label="Contact our team" onClick={close}><Icon name="phone"/></Link><button className="search-toggle" aria-label="Open search" aria-expanded={search} aria-controls="header-search" onClick={()=>{setSearch(!search);setMenu(false);}}><Icon name={search?"close":"search"}/></button><button className="menu-toggle" aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} aria-controls="main-navigation" onClick={()=>{setMenu(!menu);setSearch(false);setSubmenu(null);}}><Icon name={menu?"close":"menu"}/></button></div>
  <nav id="main-navigation" className={`primary-nav ${menu?"is-open":""}`} aria-label="Main navigation">{navigation.map(item=><div className={`nav-item nav-item-${item.key} ${submenu===item.key?"submenu-open":""} ${item.mobileDirect?"nav-item-mobile-direct":""}`} key={item.key}><Link href={item.href} onClick={close} className={path.startsWith(item.href)?"active":""}><span className="nav-label">{item.label}</span></Link>{!item.mobileDirect?<button className="nav-submenu-toggle" aria-label={`Toggle ${item.label} submenu`} aria-expanded={submenu===item.key} aria-controls={`submenu-${item.key}`} onClick={()=>setSubmenu(submenu===item.key?null:item.key)}><Icon name="down"/></button>:null}{!item.mobileDirect?<div className="nav-dropdown" id={`submenu-${item.key}`}><MegaMenu item={item} close={close}/></div>:null}</div>)}</nav>
  {search?<form id="header-search" className="header-search" action="/products" onSubmit={close}><label className="sr-only" htmlFor="global-search">Search the product catalogue</label><input id="global-search" name="q" type="search" placeholder="Search valves, options and resources" autoFocus/><button className="button" type="submit"><Icon name="search"/> Search</button></form>:null}
 </header></>;
}
