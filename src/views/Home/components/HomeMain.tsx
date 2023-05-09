import React, {Suspense} from 'react'
import { Outlet } from 'react-router-dom'
export default function HomeMain() {
  return (
    // Suspense解决点击子路由 页面整体刷新闪的问题（子路由懒加载了）
    <Suspense>
      <Outlet />
    </Suspense>
  )
}
