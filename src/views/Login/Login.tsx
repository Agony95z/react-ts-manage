import React from 'react'
import { useSelector } from 'react-redux'
import {useAppDispatch} from '../../store/index'
import type {RootState} from '../../store/'
import { Button, message } from 'antd'
import { loginAction } from '../../store/modules/users'
export default function Login() {
  const token = useSelector((state: RootState) => state.users.token)
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(loginAction({
      email: 'huangrong@imooc.com',
      pass: 'huangrong'
    }))
  }
  return (
    <div>
      <Button onClick={handleLogin}>登录</Button>
      {token}
    </div>
  )
}
