import type {Metadata} from "next";
import {brand} from "@/lib/catalogue";
import {ContactNav} from "@/components/site-blocks";
import {ContactSidebar} from "@/components/contact-sidebar";
import {InquiryForm} from "@/components/site-widgets";
import {Icon} from "@/components/site-icon";
export const metadata:Metadata={title:"Contact Us"};
export default function ContactPage(){return <div className="section-white"><div className="editorial-shell"><ContactNav/><section className="quote-content"><h1>{brand.name}: Find Us</h1><p>Discuss rotary valves for metering, feeding and airlock applications in bulk material processing and pneumatic conveying systems.</p><p>Our team can help you organize the requirements for product selection, installation and application support.</p><div className="contact-map"><div><Icon name="person"/><h2>Contact {brand.name}</h2><p>Your business address and map will appear here once the company contact information is configured.</p></div></div><div className="editorial-columns contact-form-section"><div><h2>General Inquiries</h2><InquiryForm/></div><ContactSidebar/></div></section></div></div>;}
