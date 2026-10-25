export function publicSiteUrl(){
  const configured=process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if(configured){
    try{const url=new URL(configured);if(url.protocol==="https:"&&url.hostname)return url.origin;}
    catch{/* Fall back to the canonical public domain. */}
  }
  return "https://qzdxrv.com";
}
