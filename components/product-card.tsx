import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/lib/catalogue";
import {Icon} from "./site-icon";
export function ProductCard({product}:{product:Product}){return <Link href={`/products/${product.slug}`} className="product-card"><div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width:800px) 45vw, (max-width:1100px) 20vw, 15vw"/></div><div className="product-card-copy"><h3>{product.name}</h3><span className="product-card-action">View product <Icon name="right"/></span></div></Link>;}
