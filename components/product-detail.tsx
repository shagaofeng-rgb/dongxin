import Link from "next/link";
import Image from "next/image";
import {options,type Product} from "@/lib/catalogue";
import {TaxonomyBar,ProductGallery} from "./site-widgets";
import {IndustryIcons,SidebarPromos,EditorialCards} from "./site-blocks";
import {Icon} from "./site-icon";

export function ProductDetail({product}:{product:Product}){
 const capacity=product.capacity;
 return <>
  <TaxonomyBar/>
  <div className="shell">
   <section className="detail-hero">
    <ProductGallery product={product}/>
    <div className="detail-copy">
     <h1>{product.name}</h1>
     <h2>Technical information and configurations</h2>
     <p>{product.summary}</p>
     <div className="actions">
      <Link className="button" href="/quote">Get a quote <Icon name="right"/></Link>
      <a className="text-link" href="#customizations">SEE CUSTOMIZATIONS <Icon name="down"/></a>
     </div>
     <div className="detail-downloads">
      <span>PRODUCT DOCUMENTS</span>
      <div className="download-links">
       {([["Datasheet","document"],["Brochure","brochure"],["Technical Drawing","drawing"]] as const).map(([label,icon])=>
        <Link href="/contact" key={label}><Icon name={icon}/>Request {label}</Link>
       )}
      </div>
     </div>
    </div>
   </section>
   <div className="detail-columns">
    <div>
     <section className="detail-panel product-capacity">
      <div className="product-capacity-heading">
       <h2>Capacity data</h2>
       <p>Compare the published figures for this model before confirming a valve size.</p>
      </div>
      {capacity?
       <>
       {capacity.speedsRpm?<p className="capacity-scroll-hint">Scroll the table sideways to view all rotor speeds.</p>:null}
       <div className="table-wrap" role="region" aria-label={`${product.name} capacity table`} tabIndex={0}>
        <table className="capacity-table">
         <caption>{capacity.label} ({capacity.unit})</caption>
         <thead>
          <tr>
           <th scope="col">Valve size (in.)</th>
           {capacity.speedsRpm?.map(speed=><th scope="col" key={speed}>{speed} RPM</th>)??<th scope="col">Capacity ({capacity.unit})</th>}
          </tr>
         </thead>
         <tbody>
          {capacity.rows.map(row=><tr key={row.size}>
           <th scope="row">{row.size}</th>
           {row.values.map((value,index)=><td key={index}>{value}</td>)}
          </tr>)}
         </tbody>
        </table>
       </div>
       </>:
       <div className="capacity-unlisted">
        <h3>Capacity by application</h3>
        <p>There is no published capacity table for this model. Share the material, target throughput and operating conditions for sizing.</p>
        <Link href="/quote">Discuss your requirements <Icon name="right"/></Link>
       </div>
      }
      <p className="capacity-note">Values and ratings depend on the selected configuration. Confirm final sizing and operating limits with the engineering team.</p>
     </section>
     <section className="customizations" id="customizations">
      <h2>Customizations: {product.name}</h2>
      {["Rotors","Kits","Accessories"].map(category=><div key={category}>
       <h3>{category}</h3>
       <div className="product-grid">
        {options.filter(option=>option.category===category).map(option=>
         <Link className="product-card" href={`/options/${option.slug}`} key={option.slug}>
          <div className="product-image"><Image src={option.image} alt={option.name} fill sizes="(max-width:800px) 45vw,12vw"/></div>
          <h3>{option.name}</h3>
         </Link>
        )}
       </div>
      </div>)}
     </section>
    </div>
    <aside>
     <section className="spec-box">
      <h2>Specifications</h2>
      <dl className="spec-grid">
       {product.specifications.map(spec=><div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
      </dl>
     </section>
     <h2 className="side-heading">Industries</h2>
     <IndustryIcons/>
     <h2 className="side-heading">Systems</h2>
     <div className="industry-icons">
      {([["Bulk Material","bulk"],["Dust Collector","dust"],["Pneumatic Conveying","conveying"]] as const).map(([name,icon])=>
       <Link href={`/products?system=${encodeURIComponent(name)}`} key={name}><Icon name={icon}/>{name}</Link>
      )}
     </div>
     <SidebarPromos/>
    </aside>
   </div>
   <section className="section"><h2>Blogs & Videos</h2><EditorialCards/></section>
  </div>
 </>;
}
