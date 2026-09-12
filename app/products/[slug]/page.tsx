import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {products} from "@/lib/catalogue";
import {ProductDetail} from "@/components/product-detail";
type Props={params:Promise<{slug:string}>};
const legacy:Record<string,string>={"rotary-airlock-series":"airlock-ci-series","precision-feeding-series":"md-series","abrasion-resistant-series":"xtr-ci-series"};
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=products.find(p=>p.slug===(legacy[slug]??slug));return {title:p?.name??"Product"};}
export default async function ProductPage({params}:Props){const {slug}=await params;const p=products.find(p=>p.slug===(legacy[slug]??slug));if(!p)notFound();return <ProductDetail product={p}/>;}
