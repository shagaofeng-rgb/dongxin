import type {Metadata} from "next";
import {ProductCatalogue} from "@/components/product-catalogue";
import {TaxonomyBar,AttachmentButton,FaqList} from "@/components/site-widgets";
import {HelpSection} from "@/components/site-blocks";
import {Icon} from "@/components/site-icon";
export const metadata:Metadata={title:"Rotary Valves"};
export default async function ProductsPage({searchParams}:{searchParams:Promise<{q?:string;industry?:string;system?:string}>}){
 const filters=await searchParams;
 return <><TaxonomyBar/><section className="catalogue-intro"><div><h1>Hey material, meet our rotary valves.</h1><p>Browse rotary airlock valves for metering, feeding and material handling. Input your specifications to filter results and find the right valve for your dry bulk processing application.</p></div><article className="guide-card"><Icon name="document"/><div><strong>Rotary Valve Selector Guide</strong><p>Discover what valve is right for you</p><AttachmentButton className="text-link" name="Rotary Valve Selector Guide">Download <Icon name="download"/></AttachmentButton></div></article></section><div className="shell"><ProductCatalogue key={JSON.stringify(filters)} initialQuery={filters.q} initialIndustry={filters.industry} initialSystem={filters.system}/><div className="editorial-columns"><div><h2>Valve selection, explained.</h2><p className="lead">Explore configurations for your material and installation.</p></div><FaqList/></div><HelpSection/></div></>;
}
