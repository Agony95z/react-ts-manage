import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import {
  CopyOutlined,
  CalendarOutlined,
  WarningOutlined,
  FileAddOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';


const Home = lazy(() => import('../views/Home/Home'));
const Login = lazy(() => import('../views/Login/Login'));
const Sign = lazy(() => import('../views/Sign/Sign'));
const Exception = lazy(() => import('../views/Exception/Exception'));
const Apply = lazy(() => import('../views/Apply/Apply'));
const Check = lazy(() => import('../views/Check/Check'));
const BeforeEach = lazy(() => import('../components/BeforeEach/BeforeEach'));

declare module "react-router" {
  // 拓展react-router
  interface IndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    },
    name?: string;
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    },
    name?: string;
  }
}

export const routes: RouteObject[] = [
  // redirect
  {
    path: '/',
    element: React.createElement(Navigate, {to: '/sign'})
  },
  {
    path: "/",
    // 引入路由拦截
    element: React.createElement(BeforeEach, null, React.createElement(Home)),
    name: 'home',
    meta: {
      menu: true,
      title: '考勤管理',
      icon: React.createElement(CopyOutlined),
      auth: true
    },
    children: [
      {
        path: "sign",
        element: React.createElement(Sign),
        name: 'sign',
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: React.createElement(CalendarOutlined),
          auth: true
        }
      },
      {
        path: "exception",
        element: React.createElement(Exception),
        name: 'exception',
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: React.createElement(WarningOutlined),
          auth: true,
        }
      },
      {
        path: "apply",
        element: React.createElement(Apply),
        name: 'apply',
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: React.createElement(FileAddOutlined),
          auth: true,
        }
      },
      {
        path: "check",
        element: React.createElement(Check),
        name: 'check',
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: React.createElement(ScheduleOutlined),
          auth: true,
        }
      }
    ]
  },
  {
    path: "/login",
    element: React.createElement(BeforeEach, null, React.createElement(Login)),
  }
];

const router = createBrowserRouter(routes);

export default router;