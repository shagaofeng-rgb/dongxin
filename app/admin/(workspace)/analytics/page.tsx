import {AdminPageHeader,EmptyData,MetricCard,MiniTrend} from "@/components/admin/admin-shell";
import {DateRangeControl} from "@/components/admin/date-range-control";
import {formatDuration,formatNumber} from "@/lib/admin";
import {getDashboardData} from "@/lib/admin-data";
import {displayCountry,displaySource} from "@/lib/admin-locale";

export default async function AnalyticsPage({searchParams}:{searchParams:Promise<{preset?:string;from?:string;to?:string}>}){
  const params=await searchParams;
  const {range,data}=await getDashboardData(params);
  return <>
    <AdminPageHeader title="访客与来源分析" description={`统计时间：${range.label} · 中国时间`} actions={<DateRangeControl/>}/>
    <div className="admin-metrics-grid">
      <MetricCard label="访问次数" value={formatNumber(data.metrics.sessions)} detail="按会话标识去重"/>
      <MetricCard label="页面浏览量" value={formatNumber(data.metrics.pageViews)} detail="已记录的页面浏览事件" tone="slate"/>
      <MetricCard label="平均页面停留" value={data.metrics.durationSamples?formatDuration(data.metrics.averageDuration):"—"} detail="按已记录的页面离开事件计算" tone="orange"/>
      <MetricCard label="每次访问浏览页数" value={data.metrics.sessions?(data.metrics.pageViews/data.metrics.sessions).toFixed(1):"—"} detail="页面浏览量 ÷ 访问次数"/>
    </div>
    <section className="admin-panel admin-panel-full">
      <div className="admin-panel-heading"><div><h2>页面浏览趋势</h2></div></div>
      {data.metrics.pageViews?<MiniTrend points={data.trend} label="页面浏览量"/>:<EmptyData title="当前时间范围暂无浏览数据"/>}
    </section>
    <div className="admin-layout-grid admin-layout-bottom">
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>页面来路</h2></div></div>
        {data.sources.length?<ol className="admin-ranked-list">{data.sources.map((item,index)=><li key={item.name}><span>{String(index+1).padStart(2,"0")}</span><b>{displaySource(item.name)}</b><strong>{formatNumber(item.count)}</strong></li>)}</ol>:<EmptyData/>}
      </section>
      <section className="admin-panel">
        <div className="admin-panel-heading"><div><h2>访问国家 / 地区</h2></div></div>
        {data.countries.length?<ol className="admin-ranked-list">{data.countries.map((item,index)=><li key={item.code}><span>{String(index+1).padStart(2,"0")}</span><b>{displayCountry(item.code)}{item.code!=="未知"?` (${item.code})`:""}</b><strong>{formatNumber(item.count)}</strong></li>)}</ol>:<EmptyData title="当前时间范围暂无地区数据"/>}
      </section>
    </div>
    <section className="admin-panel admin-panel-full"><div className="admin-panel-heading"><div><h2>统计口径</h2></div></div><div className="admin-insight-list"><p>页面来路和国家 / 地区按每次访问的首次页面浏览统计；UTM 来源优先，其次为浏览器提供的来源域名。未提供来源的访问记为直接访问。</p><p>国家 / 地区来自网络边缘节点定位，可能与访客实际所在地不同。平均页面停留仅基于已记录的离开事件。</p><p>访客以匿名浏览器标识区分，不保存原始 IP 地址。</p></div></section>
  </>;
}
