import type { MetadataRoute } from "next";
import { articles, industries, options, products } from "@/lib/catalogue";
export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl=(process.env.NEXT_PUBLIC_SITE_URL??"https://example.com").replace(/\/$/,"");
 const paths=["","/products","/options","/resources","/about","/contact","/quote","/blog","/support","/models","/sizing","/privacy",...["representatives","consulting","design-assistance","replacement"].map(p=>`/contact/${p}`),...["videos","downloads","technical-drawings","glossary"].map(p=>`/resources/${p}`),...products.map(p=>`/products/${p.slug}`),...industries.map(p=>`/solutions/${p.slug}`),...options.map(p=>`/options/${p.slug}`),...articles.map(p=>`/blog/${p.slug}`)];
 return paths.map(path=>({url:`${baseUrl}${path}`}));
}
