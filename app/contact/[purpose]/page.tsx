import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {ContactNav} from "@/components/site-blocks";
import {ContactSidebar} from "@/components/contact-sidebar";
import {InquiryForm,FaqList} from "@/components/site-widgets";
const purposes:Record<string,{title:string;description:string}>={representatives:{title:"Locate a Representative",description:"Share your location and application details to start a conversation with the team."},consulting:{title:"I Need Airlock Consulting",description:"Discuss your material, process and operating conditions with the application team."},"design-assistance":{title:"Get Design Assistance",description:"Share the installation dimensions and material handling requirements for your project."},replacement:{title:"Request a Replacement Valve",description:"Provide the existing valve details, dimensions and operating requirements to discuss a replacement."}};
type Props={params:Promise<{purpose:string}>};
export function generateStaticParams(){return Object.keys(purposes).map(purpose=>({purpose}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {purpose}=await params;return {title:purposes[purpose]?.title??"Contact"};}
export default async function ContactPurposePage({params}:Props){const {purpose}=await params;const aliases:Record<string,string>={"contact-us":"/contact","request-a-quote":"/quote","locate-representative":"/contact/representatives"};if(aliases[purpose])redirect(aliases[purpose]);const item=purposes[purpose];if(!item)notFound();return <div className="section-white"><div className="editorial-shell"><ContactNav/><div className="editorial-columns quote-content"><div><h1>{item.title}</h1><p className="lead">{item.description}</p><InquiryForm/><section className="section"><h2>Questions before you start?</h2><FaqList/></section></div><ContactSidebar/></div></div></div>;}
