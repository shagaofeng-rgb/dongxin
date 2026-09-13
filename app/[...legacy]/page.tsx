import {notFound,redirect} from "next/navigation";
import {industries,products,options,articles} from "@/lib/catalogue";
const aliases:Record<string,string>={
 "rotary-valves":"/products","rotary-valve-options":"/options","rotary-valve-models":"/models","model-viewer-intro":"/models","rotary-valve-resources":"/resources","rotary-valve-blog":"/blog","rotary-valve-support":"/support","valve-sizing-tool":"/sizing","rotary-valve-nfpa":"/compliance",
 "contact/contact-us":"/contact","contact/request-a-quote":"/quote","contact/locate-representative":"/contact/representatives","contact/airlock-consulting":"/contact/consulting","contact/design-assistance":"/contact/design-assistance","contact/request-replacement-valve":"/contact/replacement",
 "rotary-valve-resources/technicaldrawings":"/resources/technical-drawings","rotary-valve-blog/events":"/blog?category=Events","rotary-valve-blog/experts":"/about","rotary-valve-blog/faq":"/support?category=FAQs","about/aoda":"/about/accessibility","about/industry-associations":"/about/industry-associations","about/trade-associations":"/about/trade-associations","careers":"/careers"
};
const systems:Record<string,string>={"bulk-material":"Bulk Material","dust-collector":"Dust Collector","pneumatic-conveying":"Pneumatic Conveying","metering-airlock":"Rotary Airlock","metering-feeding":"Rotary Airlock","rotary-airlock":"Rotary Airlock"};

export default async function LegacyRoute({params}:{params:Promise<{legacy:string[]}>}){
 const {legacy}=await params;
 const path=legacy.join("/");
 if(aliases[path])redirect(aliases[path]);
 if(legacy[0]==="rotary-valves"&&legacy[1]==="view"){
  const product=products.find(item=>item.slug===legacy[2]);
  redirect(product?`/products/${product.slug}`:"/products");
 }
 if(legacy[0]==="rotary-valves"&&industries.some(item=>item.slug===legacy[1]))redirect(`/solutions/${legacy[1]}`);
 if(legacy[0]==="rotary-valves"&&systems[legacy[1]])redirect(`/products?system=${encodeURIComponent(systems[legacy[1]])}`);
 if(legacy[0]==="rotary-valve-options"&&legacy[1]==="view"){
  const option=options.find(item=>item.slug===legacy[2]);
  redirect(option?`/options/${option.slug}`:"/options");
 }
 if(legacy[0]==="rotary-valve-options"&&["rotors","kits","accessories","conveying-equipment"].includes(legacy[1])){
  const category=legacy[1]==="conveying-equipment"?"Conveying Equipment":legacy[1][0].toUpperCase()+legacy[1].slice(1);
  redirect(`/options?category=${encodeURIComponent(category)}`);
 }
 if(legacy[0]==="rotary-valve-resources")redirect(`/resources/${["videos","downloads","glossary","technicaldrawings"].includes(legacy[1])?(legacy[1]==="technicaldrawings"?"technical-drawings":legacy[1]):"downloads"}`);
 if(legacy[0]==="rotary-valve-blog"&&legacy[1]==="read"&&legacy[2]==="title"){
  const article=articles.find(item=>item.slug===legacy[3]);
  redirect(article?`/blog/${article.slug}`:"/blog");
 }
 if(legacy[0]==="rotary-valve-blog")redirect("/blog");
 if(legacy[0]==="rotary-valve-support")redirect("/support");
 if(legacy[0]==="job-postings")redirect("/careers");
 if(legacy[0]==="landing-pages"||legacy[0]==="niche-markets")redirect("/products");
 notFound();
}
