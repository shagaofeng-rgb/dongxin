import type {Metadata} from "next";
import {ModelGallery} from "@/components/product-tools";
export const metadata:Metadata={title:"3D Gallery"};
export default function ModelsPage(){return <section className="model-page shell"><h1>Welcome to the 3D Gallery</h1><p className="lead">Explore rotary airlock valves and configuration options.<br/><strong>Click on a valve or option to get started.</strong></p><ModelGallery/><p className="preview-note">Gallery layout preview. Add your own 3D model files before enabling the model viewer.</p></section>;}
