import {NextResponse} from "next/server";
import {requireAdmin} from "@/lib/admin";
import {getInquiryDetail,getInquiryPage} from "@/lib/admin-data";

export async function GET(request:Request){
  await requireAdmin(); const {searchParams}=new URL(request.url); const id=searchParams.get("id");
  try{
    if(id){const detail=await getInquiryDetail(id);return detail?NextResponse.json(detail):NextResponse.json({error:"未找到该询盘"},{status:404});}
    const page=Math.max(1,Number(searchParams.get("page"))||1);const pageSize=Number(searchParams.get("pageSize"))||20;
    const result=await getInquiryPage({page,pageSize,status:searchParams.get("status")||"",country:searchParams.get("country")||"",query:searchParams.get("query")||"",rangeInput:{preset:searchParams.get("preset")||undefined,from:searchParams.get("from")||undefined,to:searchParams.get("to")||undefined}});
    return NextResponse.json(result);
  }catch{return NextResponse.json({error:"数据暂时无法读取，请重试"},{status:503});}
}
