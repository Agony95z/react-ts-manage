import React from 'react';
import { useSelector } from 'react-redux'
import {useAppDispatch} from '../../store/index'
import type {RootState} from '../../store/'
import { loginAction, updateToken } from '../../store/modules/users'
import styles from './Login.module.scss'
import classNames from 'classnames'
import { Button, Checkbox, Form, Input, message } from 'antd';
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
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.login}>
      <div className={styles.header}>
      <span className={styles['header-logo']}>
        <i className={classNames('iconfont icon-React', styles['icon-React'])}></i>
        <i className={classNames('iconfont icon-test', styles['icon-test'])}></i>
        <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
      </span>
      <span className={styles['header-title']}>在线考勤系统</span>
    </div>
    <div className={styles.desc}>
      Study React、+ TypeScript
    </div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
