import type { MetadataRoute } from "next";
import { articles, industries, options, products } from "@/lib/catalogue";
import {publicSiteUrl} from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl=publicSiteUrl();
 const paths=["","/products","/options","/resources","/about","/compliance","/contact","/quote","/blog","/support","/models","/sizing","/privacy","/about/accessibility",...["representatives","consulting","design-assistance","replacement"].map(p=>`/contact/${p}`),...["videos","downloads","technical-drawings","glossary"].map(p=>`/resources/${p}`),...products.map(p=>`/products/${p.slug}`),...industries.map(p=>`/solutions/${p.slug}`),...options.map(p=>`/options/${p.slug}`),...articles.map(p=>`/blog/${p.slug}`)];
 return paths.map(path=>({url:`${baseUrl}${path}`}));
}
