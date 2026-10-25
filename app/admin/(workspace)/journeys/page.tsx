import {AdminPageHeader} from "@/components/admin/admin-shell";
import {DateRangeControl} from "@/components/admin/date-range-control";
import {VisitorTable} from "@/components/admin/visitor-table";
import {getDateRange} from "@/lib/admin";

export default async function JourneysPage({searchParams}:{searchParams:Promise<{preset?:string;from?:string;to?:string}>}){
  const params=await searchParams;
  const range=getDateRange(params);
  return <>
    <AdminPageHeader title="访问轨迹" description={`统计时间：${range.label} · 中国时间`} actions={<DateRangeControl/>}/>
    <div className="admin-summary-strip">点击记录查看该会话中实际采集到的浏览、表单与 WhatsApp 点击事件。</div>
    <VisitorTable key={`${range.from}-${range.to}`} range={range} journey/>
  </>;
}
