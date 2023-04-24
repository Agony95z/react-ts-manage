import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject, Router } from "react-router-dom";

const Home = lazy(() => import('../views/Home/Home'));
const Login = lazy(() => import('../views/Login/Login'));
const Sign = lazy(() => import('../views/Sign/Sign'));
const Exception = lazy(() => import('../views/Exception/Exception'));
const Apply = lazy(() => import('../views/Apply/Apply'));
const Check = lazy(() => import('../views/Check/Check'));

const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(Home),
    children: [
      {
        path: "sign",
        element: React.createElement(Sign),
      },
      {
        path: "exception",
        element: React.createElement(Exception),
      },
      {
        path: "apply",
        element: React.createElement(Apply),
      },
      {
        path: "check",
        element: React.createElement(Check),
      }
    ]
  },
  {
    path: "/login",
    element: React.createElement(Login),
  }
];

const router = createBrowserRouter(routes);

export default router;