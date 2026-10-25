import {LoginForm} from "@/components/admin/auth-forms";

export const metadata={title:"管理后台登录",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default function LoginPage(){return <div lang="zh-CN"><LoginForm/></div>;}
