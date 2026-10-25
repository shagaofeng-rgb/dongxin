export function formatNumber(value:number){return new Intl.NumberFormat("zh-CN").format(value);}

export function formatDuration(milliseconds:number){
  const seconds=Math.round(milliseconds/1000);
  if(seconds<60)return `${seconds} 秒`;
  return `${Math.floor(seconds/60)} 分 ${seconds%60} 秒`;
}

export function formatDate(value:string){return new Intl.DateTimeFormat("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(value));}

export function formatDateKey(value:string){
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(value));
  const part=(type:string)=>parts.find(item=>item.type===type)?.value||"";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
