import {NextResponse} from "next/server";
import {requireAdmin} from "@/lib/admin";
import {getVisitorDetail,getVisitorSessionPage} from "@/lib/admin-data";

const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request:Request){
  await requireAdmin();const {searchParams}=new URL(request.url);const id=searchParams.get("id");
  try{
    if(id){if(!uuid.test(id))return NextResponse.json({error:"无效的访问记录"},{status:400});const detail=await getVisitorDetail(id);return detail?NextResponse.json(detail):NextResponse.json({error:"未找到访问记录"},{status:404});}
    const page=Math.max(1,Number(searchParams.get("page"))||1);const pageSize=Number(searchParams.get("pageSize"))||20;
    const result=await getVisitorSessionPage({page,pageSize,device:searchParams.get("device")||"",query:searchParams.get("query")||"",rangeInput:{preset:searchParams.get("preset")||undefined,from:searchParams.get("from")||undefined,to:searchParams.get("to")||undefined}});
    return NextResponse.json(result);
  }catch{return NextResponse.json({error:"数据暂时无法读取，请重试"},{status:503});}
}
