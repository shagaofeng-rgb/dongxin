import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {products} from "@/lib/catalogue";
import {ResourceCard,PromoRow} from "@/components/site-blocks";
const kinds:Record<string,string>={videos:"Videos",downloads:"Downloads","technical-drawings":"Technical Drawings",glossary:"Glossary"};
type Props={params:Promise<{kind:string}>};
export function generateStaticParams(){return Object.keys(kinds).map(kind=>({kind}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {kind}=await params;return {title:kinds[kind]??"Resources",alternates:{canonical:`/resources/${kind}`}};}
export default async function ResourceCategory({params}:Props){
 const {kind}=await params;const title=kinds[kind];if(!title)notFound();
 return <div className="shell"><h1 className="page-heading">{title}</h1><nav className="tabs" aria-label="Resource categories">{Object.entries(kinds).map(([slug,label])=><Link href={`/resources/${slug}`} className={kind===slug?"active":""} key={slug}>{label}</Link>)}</nav>
 {kind==="videos"?<section className="resource-sections"><div className="empty-state"><h2>No product videos are currently published.</h2><p>For product operation and maintenance information, contact our team.</p><Link className="button button-blue" href="/contact">Contact our team</Link></div></section>:kind==="glossary"?<section className="resource-sections glossary-list">{[["Airlock","Equipment used to separate areas with different pressure conditions while transferring material."],["Bulk Density","The mass of a bulk material divided by the volume it occupies, including the spaces between particles."],["Conveying Rate","The quantity of material transported over a given period, expressed with a defined mass or volume unit."],["Rotor","The rotating component inside a rotary valve that carries material through the housing."],["Shaft Seal","A sealing arrangement at the point where a rotating shaft passes through the housing."]].map(([term,definition])=><section key={term}><h2>{term}</h2><p>{definition}</p></section>)}</section>:<section className="resource-sections"><div className="resource-cards">{products.slice(0,16).map(p=><ResourceCard title={p.name} type={kind==="downloads"?"Datasheet":"Technical Drawing"} key={p.slug}/>)}</div></section>}
 <PromoRow/></div>;
}
