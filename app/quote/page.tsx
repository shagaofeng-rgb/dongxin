import type {Metadata} from "next";
import {ContactNav} from "@/components/site-blocks";
import {ContactSidebar} from "@/components/contact-sidebar";
import {QuoteForm} from "@/components/quote-form";
export const metadata:Metadata={title:"Request a Quote"};
export default function QuotePage(){return <div className="section-white"><div className="editorial-shell"><ContactNav/><div className="editorial-columns quote-content"><div><h1>Request a Quote</h1><p className="lead">Thank you for your interest. Please fill in the form below for a quote.</p><QuoteForm/></div><ContactSidebar/></div></div></div>;}
