import React from 'react'
import { useSelector } from 'react-redux'
import {useAppDispatch} from '../../store/index'
import type {RootState} from '../../store/'
import { Button, message } from 'antd'
import { loginAction, updateToken } from '../../store/modules/users'
export default function Login() {
  const token = useSelector((state: RootState) => state.users.token)
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(loginAction({
      email: 'huangrong@imooc.com',
      pass: 'huangrong'
    })).then(action => {
      const {token, errcode} = (action.payload as {[index: string]: unknown}).data as {[index: string]: unknown};
      if (errcode === 0) {
        dispatch(updateToken(token as string));
        message.success('登录成功');
      } else {
        message.success('登录失败');
      }
    })
  }
  return (
    <div>
      <Button onClick={handleLogin}>登录</Button>
      {token}
    </div>
  )
}
