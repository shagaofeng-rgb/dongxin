"use client";

import {Spinner} from "@phosphor-icons/react";

export default function AdminLoading(){return <div className="admin-page-loading" role="status"><div><Spinner size={30} className="admin-loading-spinner"/><p>正在读取数据…</p></div></div>;}
