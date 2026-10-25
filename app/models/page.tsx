import type {Metadata} from "next";
import {ModelGallery} from "@/components/product-tools";
export const metadata:Metadata={title:"Product Gallery",alternates:{canonical:"/models"}};
export default function ModelsPage(){return <section className="model-page shell"><h1>Product Gallery</h1><p className="lead">Browse rotary airlock valves and configuration options. Select an item for product information.</p><ModelGallery/></section>;}
