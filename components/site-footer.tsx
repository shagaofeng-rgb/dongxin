import Link from "next/link";
import {brand,industries} from "@/lib/catalogue";
import {CONTACT_ADDRESS,CONTACT_EMAIL,CONTACT_PHONE,CONTACT_PHONE_DISPLAY} from "@/lib/contact";
import {Icon} from "./site-icon";

const productLinks=[
 {label:"All valves",href:"/products"},
 {label:"Rotary valve options",href:"/options"},
 {label:"Valve sizing tool",href:"/sizing"}
];
const companyLinks=[
 {label:"About us",href:"/about"},
 {label:"Blog and news",href:"/blog"},
 {label:"Technical support",href:"/support"},
 {label:"Glossary",href:"/resources/glossary"},
 {label:"Contact us",href:"/contact"}
];

function FooterGroup({title,links}:{title:string;links:{label:string;href:string}[]}){
 const items=links.map(link=><Link href={link.href} key={link.href}>{link.label}</Link>);
 return <>
  <div className="footer-group footer-group-desktop">
   <h3>{title}</h3>
   <nav className="footer-link-list" aria-label={title}>{items}</nav>
  </div>
  <details className="footer-group footer-group-mobile">
   <summary>{title}</summary>
   <nav className="footer-link-list" aria-label={title}>{items}</nav>
  </details>
 </>;
}

export function SiteFooter(){
 return <footer className="site-footer">
  <div className="footer-cta">
   <div className="footer-inner footer-cta-inner">
    <div>
     <h2>Need help choosing a valve?</h2>
     <p>Tell us about your material, capacity and operating conditions.</p>
    </div>
    <Link className="footer-cta-button" href="/quote">Request a quote <Icon name="right"/></Link>
   </div>
  </div>
  <div className="footer-inner footer-main">
   <div className="footer-contact">
    <Link className="footer-brand" href="/">{brand.name}</Link>
    <p>Rotary valves and material handling equipment.</p>
    <address>
     <div><span>Address</span><span>{CONTACT_ADDRESS}</span></div>
     <div><span>Phone</span><a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE_DISPLAY}</a></div>
     <div><span>Email</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
    </address>
   </div>
   <div className="footer-groups">
    <FooterGroup title="Products" links={productLinks}/>
    <FooterGroup title="Applications" links={industries.map(industry=>({label:industry.name,href:`/solutions/${industry.slug}`}))}/>
    <FooterGroup title="Company & support" links={companyLinks}/>
   </div>
  </div>
  <div className="footer-inner footer-bottom">
   <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
   <Link href="/privacy">Privacy policy</Link>
  </div>
 </footer>;
}
