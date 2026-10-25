import {AdminShell} from "@/components/admin/admin-shell";
import {requireAdmin} from "@/lib/admin";

export const dynamic="force-dynamic";

export default async function WorkspaceLayout({children}:{children:React.ReactNode}){const user=await requireAdmin();return <div lang="zh-CN"><AdminShell user={user}>{children}</AdminShell></div>;}
