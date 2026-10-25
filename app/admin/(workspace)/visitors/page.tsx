import {AdminPageHeader,MetricCard} from "@/components/admin/admin-shell";
import {DateRangeControl} from "@/components/admin/date-range-control";
import {VisitorTable} from "@/components/admin/visitor-table";
import {formatDuration,formatNumber} from "@/lib/admin";
import {getDashboardData} from "@/lib/admin-data";

export default async function VisitorsPage({searchParams}:{searchParams:Promise<{preset?:string;from?:string;to?:string}>}){
  const params=await searchParams;
  const {range,data}=await getDashboardData(params);
  return <>
    <AdminPageHeader title="访客记录" description={`统计时间：${range.label} · 中国时间`} actions={<DateRangeControl/>}/>
    <div className="admin-metrics-grid">
      <MetricCard label="独立访客" value={formatNumber(data.metrics.visitors)} detail="按匿名浏览器标识去重"/>
      <MetricCard label="访问次数" value={formatNumber(data.metrics.sessions)} detail="按已记录的会话标识去重" tone="slate"/>
      <MetricCard label="页面浏览量" value={formatNumber(data.metrics.pageViews)} detail="已记录的页面浏览事件" tone="orange"/>
      <MetricCard label="平均页面停留" value={data.metrics.durationSamples?formatDuration(data.metrics.averageDuration):"—"} detail="按页面离开事件计算"/>
    </div>
    <div className="admin-summary-strip">访客列表按会话展示；记录时长为首末采集事件之间的时间，不等同于完整在线时长。</div>
    <VisitorTable key={`${range.from}-${range.to}`} range={range}/>
  </>;
}
