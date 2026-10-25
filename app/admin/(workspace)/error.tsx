"use client";

import {WarningCircle} from "@phosphor-icons/react";

export default function AdminError({reset}:{error:Error;reset:()=>void}){
  return <div className="admin-page-error" role="alert"><div><WarningCircle size={32}/><h1>数据暂时无法读取</h1><p>请稍后重试。系统不会以零值代替查询失败的结果。</p><button type="button" onClick={reset}>重新加载</button></div></div>;
}
