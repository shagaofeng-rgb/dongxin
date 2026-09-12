import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/lib/catalogue";
export function ProductCard({product}:{product:Product}){return <Link href={`/products/${product.slug}`} className="product-card"><div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width:800px) 45vw, (max-width:1100px) 20vw, 15vw"/></div><h3>{product.name}</h3></Link>;}
