const statusLabels:Record<string,string>={new:"新询盘",reviewing:"跟进中",qualified:"有效询盘",closed:"已关闭"};
const eventLabels:Record<string,string>={page_view:"浏览页面",page_exit:"离开页面",whatsapp_click:"点击 WhatsApp",form_started:"开始填写表单",form_submit:"提交表单",cta_click:"点击按钮"};
const fieldLabels:Record<string,string>={
  "first-name":"名字","last-name":"姓氏","email-address":"邮箱地址","company-name":"公司名称",
  "state-province":"省份 / 州","country":"国家 / 地区","comments":"留言内容","company":"公司",
  "area-code-telephone-number":"区号 / 电话号码","company-type":"公司类型","industry":"所属行业",
  "job-role":"职位","title":"职称","common-name":"物料名称","material-characteristics":"物料特性",
  "maximum-particle-size":"最大颗粒尺寸","maximum-rate-of-flow-per-hour-include-units":"最大小时流量（含单位）",
  "variable-feed-max-rate":"变频给料最大流量","variable-feed-min-rate":"变频给料最小流量",
  "please-specify-electrical-voltage":"电气要求（电压）","please-specify-the-quantity-of-valves":"阀门数量",
  "applicable-standard-requirement":"适用标准 / 要求","additional-compliance-comments":"其他合规要求",
  "please-specify-the-function-of-the-rotary-valve":"旋转阀用途",
  "bulk-density-aerated-lbs-cu-ft":"松装密度（磅 / 立方英尺）",
  "bulk-density-settled-lbs-cu-ft":"振实密度（磅 / 立方英尺）",
  "abrasiveness":"磨蚀性","variable-feed-rate-required":"是否需要变频给料","duty-cycle":"运行周期",
  "please-specify-what-is-above-the-rotary-valve":"旋转阀上方设备",
  "please-specify-what-is-below-the-rotary-valve":"旋转阀下方设备",
  "please-specify-the-material-of-construction":"制造材质",
  "please-specify-if-food-grade-finish-is-needed":"是否需要食品级表面处理",
  "air-pressure-above-the-valve":"阀门上方气压类型",
  "air-pressure-below-the-valve":"阀门下方气压类型",
  "value-of-air-pressure-above-the-valve":"阀门上方气压值",
  "value-of-air-pressure-below-the-valve":"阀门下方气压值",
  "pressure-unit-above":"阀门上方压力单位","pressure-unit-below":"阀门下方压力单位",
  "temperature-above-the-valve-f":"阀门上方温度（华氏度）",
  "temperature-below-the-valve-f":"阀门下方温度（华氏度）",
  "p-red":"P（红色）","kst-of-material":"物料 Kst 值",
  "consent":"接收产品及应用资讯"
};

export function displayStatus(value:string){return statusLabels[value]||value;}
export function displayEvent(value:string){return eventLabels[value]||value.replaceAll("_"," ");}
export function displayFormType(value:string){return value==="quote"?"报价询盘":value==="contact"?"联系表单":value;}
export function displayDevice(value:string|null){return value==="mobile"?"手机":value==="tablet"?"平板":value==="desktop"?"电脑":value||"—";}
export function displaySource(value:string|null){return !value||value==="Direct"?"直接访问":value;}
export function displayCountry(value:string|null){if(!value)return "未知";try{return new Intl.DisplayNames(["zh-CN"],{type:"region"}).of(value)||value;}catch{return value;}}
export function displayField(value:string){return fieldLabels[value]||value.replaceAll("-"," ");}
export function displayCategory(value:string){return ({"Dust Collector":"除尘设备","Diverter":"换向阀","Rotary Airlock":"旋转锁气阀","Bulk Material":"散装物料处理","Pneumatic Conveying":"气力输送","Quick Cleaning":"快速清洁","Customization":"定制配置","Valve Tips":"阀门知识","Maintenance":"维护保养","Food Safety":"食品安全","Durability":"耐用性"} as Record<string,string>)[value]||value;}
