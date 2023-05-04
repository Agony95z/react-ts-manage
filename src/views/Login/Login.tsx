import React from 'react';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/index'
import type { RootState } from '../../store/'
import { loginAction, updateToken } from '../../store/modules/users'
import styles from './Login.module.scss'
import classNames from 'classnames'
import { Button, Col, Form, Input, message, Row } from 'antd';
export interface IUser {
  email: string
  pass: string
}
const testUsers: IUser[] = [
  {
    email: "huangrong@imooc.com",
    pass: "huangrong",
  },
  {
    email: "hongqigong@imooc.com",
    pass: "hongqigong",
  },
];
export default function Login() {
  const token = useSelector((state: RootState) => state.users.token)
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(loginAction({
      email: 'huangrong@imooc.com',
      pass: 'huangrong'
    })).then(action => {
      const { token, errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown };
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
  const autoLogin = (user: IUser) => {
    // ruleForm.email = user.email;
    // ruleForm.pass = user.pass;
    return () => {}
  }
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
        Study React + TypeScript
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
        className={styles.main}
      >
        <Form.Item
          label="邮箱"
          name="emial"
          rules={[{ required: true, message: 'Please input your emial!' }]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pass"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.users}>
        <Row gutter={20}>
          {
            testUsers.map((v) => (
              <Col key={v.email} span={12}>
                <h3>测试账号，</h3>
                <Button onClick={autoLogin({ email: v.email, pass: v.pass })}
                >一键登录</Button>
                <p>邮箱：{v.email}</p>
                <p>密码：{v.pass}</p>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}
