import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'
import { routes } from '../../router'
import { useAppDispatch } from '../../store'
import {infosAction, updateInfos} from '../../store/modules/users'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { Infos } from '../../store/modules/users'
import _ from 'lodash';
interface BeforeEachProps {
  children?: React.ReactNode
}
// 添加路由守卫
export default function BeforeEach(props: BeforeEachProps) {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  const token = useSelector((state: RootState) => state.users.token)
  const infos = useSelector((state: RootState) => state.users.infos)
  // console.log(location, matchs, routes)
  if (Array.isArray(matchs)) {
    // 判断是否需要权限
    const meta = matchs[matchs.length - 1].route.meta
    if (meta?.auth && _.isEmpty(infos)) {
      if (token) {
        dispatch(infosAction()).then(action => {
          const { infos, errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos))
          }
          console.log(action, 'oooo')
        })
      } else {
        return <Navigate to='/login' />
      }
    }
  }
  // 免登录
  if (token && location.pathname === '/login') {
    <Navigate to='/' />
  }
  return (
    <>{ props.children }</>
  )
}
