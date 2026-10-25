import "@/app/admin/admin.css";
import "@/app/admin/command-center.css";
import "@/app/admin/auth.css";
import "@/app/admin/locale.css";
import type {Metadata} from "next";

export const metadata:Metadata={robots:{index:false,follow:false}};

export default function AdminLayout({children}:{children:React.ReactNode}){return children;}
