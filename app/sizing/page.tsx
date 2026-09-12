import type {Metadata} from "next";
import {Media} from "@/components/site-blocks";
import {SizingWizard} from "@/components/product-tools";
export const metadata:Metadata={title:"Rotary Valve Sizing Tool"};
export default function SizingPage(){return <><section className="sizing-hero"><div><h1>Rotary Valve Sizing Tool</h1><h2>Size your valve in 3 steps!</h2><p className="lead">Start with the conveying rate, material bulk density and filling efficiency to estimate the displacement required by your process.</p></div><Media src="/media/sizing.webp" alt="Rotary valve sizing" priority/></section><div className="shell section-white"><SizingWizard/></div></>;}
