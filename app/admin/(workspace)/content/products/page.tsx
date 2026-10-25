import {AdminPageHeader,MetricCard} from "@/components/admin/admin-shell";
import {ContentTable} from "@/components/admin/content-table";
import {products} from "@/lib/catalogue";

export default function ProductsAdminPage(){
  const categories=new Set(products.map(product=>product.category)).size;
  const specifications=products.reduce((sum,product)=>sum+product.specifications.length,0);
  const items=products.map(product=>({name:product.name,slug:product.slug,category:product.category,summary:product.summary,specifications:product.specifications.length}));
  return <><AdminPageHeader title="产品内容" description="与当前官网产品目录同步的只读清单。"/><div className="admin-metrics-grid admin-metrics-three"><MetricCard label="目录产品" value={String(products.length)} detail="当前官网目录中的产品记录"/><MetricCard label="产品分类" value={String(categories)} detail="按目录分类字段去重" tone="slate"/><MetricCard label="参数项总数" value={String(specifications)} detail="所有产品参数条目合计" tone="orange"/></div><ContentTable items={items} type="products"/></>;
}
