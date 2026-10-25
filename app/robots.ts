import type { MetadataRoute } from "next";
import {publicSiteUrl} from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow:["/api/","/auth/"] }, sitemap: `${publicSiteUrl()}/sitemap.xml` }; }
