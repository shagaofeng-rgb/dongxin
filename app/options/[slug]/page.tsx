import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {options,products} from "@/lib/catalogue";
import {Media,IndustryIcons,SidebarPromos} from "@/components/site-blocks";
import {AttachmentButton} from "@/components/site-widgets";
import {ProductCard} from "@/components/product-card";
import {Icon} from "@/components/site-icon";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return options.map(o=>({slug:o.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;return {title:options.find(o=>o.slug===slug)?.name??"Valve Option"};}
export default async function OptionPage({params}:Props){const {slug}=await params;const item=options.find(o=>o.slug===slug);if(!item)notFound();return <div className="shell"><section className="detail-hero option-hero"><Media src={item.image} alt={item.name} priority/><div className="detail-copy"><h1>{item.name}</h1><p>Explore this configuration for your material handling process. Confirm the application, construction material and compatible valve model with the engineering team.</p><AttachmentButton className="button button-blue button-small" name="3D model"><Icon name="model"/> Explore in the 3D viewer</AttachmentButton></div></section><div className="detail-columns"><div><h2 className="side-heading">Applicable Industries</h2><IndustryIcons/><section className="detail-panel option-materials"><h2>Information:</h2><p>Compatibility and configuration depend on the selected valve and operating conditions.</p><h2>Materials:</h2><ul className="arrow-list">{["Mild steel","Stainless steel","Application-specific wear materials"].map(t=><li key={t}><Icon name="right"/>{t}</li>)}</ul></section></div><aside><h2 className="side-heading">Used in these valves</h2><div className="product-grid" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>{products.slice(1,8).map(p=><ProductCard product={p} key={p.slug}/>)}</div><SidebarPromos/></aside></div></div>;}
