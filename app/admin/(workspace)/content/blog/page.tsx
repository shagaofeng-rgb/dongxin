import {AdminPageHeader,MetricCard} from "@/components/admin/admin-shell";
import {ContentTable} from "@/components/admin/content-table";
import {articles} from "@/lib/catalogue";

export default function BlogAdminPage(){
  const categories=new Set(articles.map(article=>article.category)).size;
  const items=articles.map(article=>({name:article.title,slug:article.slug,category:article.category,summary:article.summary}));
  return <><AdminPageHeader title="新闻与文章" description="与当前官网文章目录同步的只读清单。"/><div className="admin-metrics-grid admin-metrics-three"><MetricCard label="目录文章" value={String(articles.length)} detail="当前官网目录中的文章记录"/><MetricCard label="文章分类" value={String(categories)} detail="按目录分类字段去重" tone="slate"/></div><ContentTable items={items} type="blog"/></>;
}
