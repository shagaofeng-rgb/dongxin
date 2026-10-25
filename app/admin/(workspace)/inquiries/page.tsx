import {AdminPageHeader} from "@/components/admin/admin-shell";
import {DateRangeControl} from "@/components/admin/date-range-control";
import {InquiryTable} from "@/components/admin/inquiry-table";
import {getDateRange} from "@/lib/admin";

export default async function InquiriesPage({searchParams}:{searchParams:Promise<{preset?:string;from?:string;to?:string}>}){
  const params=await searchParams;
  const range=getDateRange(params);
  return <>
    <AdminPageHeader title="表单提交记录" description={`统计时间：${range.label} · 中国时间`} actions={<DateRangeControl/>}/>
    <div className="admin-summary-strip">点击询盘可查看客户填写的完整内容及关联的访问轨迹。</div>
    <InquiryTable key={`${range.from}-${range.to}`} range={range}/>
  </>;
}
