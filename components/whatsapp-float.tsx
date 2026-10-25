"use client";

import {trackEvent} from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/message/3CXLF6FWKCHEH1";

export function WhatsAppFloat(){
  return <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" onClick={()=>trackEvent("whatsapp_click",{entryPoint:"floating_button"})}>
    <img src="/media/whatsapp-official.svg" width="60" height="60" alt="" aria-hidden="true" />
    <span className="sr-only">Chat on WhatsApp</span>
  </a>;
}
