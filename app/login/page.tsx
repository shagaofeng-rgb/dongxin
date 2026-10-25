import {LoginForm} from "@/components/admin/auth-forms";
import "@/app/admin/auth.css";
import "@/app/admin/locale.css";

export const metadata={title:"管理后台登录",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default function StandaloneLoginPage(){return <div lang="zh-CN"><LoginForm/></div>;}
