import Image from "next/image";
import Link from "next/link";
import {Icon} from "./site-icon";

type Card={title:string;copy:string;icon:string;href?:string};
type Props={eyebrow:string;title:string;lead:string;image:string;cards:readonly Card[];cta?:{label:string;href:string};note?:string};

export function EditorialPage({eyebrow,title,lead,image,cards,cta,note}:Props){
 return <>
  <section className="editorial-hero">
   <div className="editorial-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{lead}</p>{cta?<Link className="button" href={cta.href}>{cta.label}<Icon name="right"/></Link>:null}</div>
   <div className="editorial-hero-media"><Image src={image} alt="" fill priority sizes="(max-width:800px) 100vw, 46vw"/></div>
  </section>
  <section className="editorial-program shell">
   <div className="editorial-program-intro"><p className="eyebrow">Dongxin Machinery</p><h2>Practical support for every stage of the process.</h2><p>Use this space to present approved company information, technical guidance and service pathways without borrowing another manufacturer’s claims, people or certifications.</p></div>
   <div className="editorial-program-grid">{cards.map(card=>{
    const body=<><Icon name={card.icon}/><h3>{card.title}</h3><p>{card.copy}</p>{card.href?<span className="text-link">Learn more <Icon name="right"/></span>:null}</>;
    return card.href?<Link className="editorial-program-card" href={card.href} key={card.title}>{body}</Link>:<article className="editorial-program-card" key={card.title}>{body}</article>;
   })}</div>
   {note?<p className="preview-note editorial-note">{note}</p>:null}
  </section>
 </>;
}
