import React from 'react';
import { useAppDispatch } from '../../store/index'
import { loginAction, updateToken } from '../../store/modules/users'
import styles from './Login.module.scss'
import classNames from 'classnames'
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 获取表单信息
  const [form] = Form.useForm()
  const handleLogin = () => {
    const values = form.getFieldsValue()
    onFinish(values)
  }
  const onFinish = (values: IUser) => {
    console.log('Success:', values);
    dispatch(loginAction(values)).then(action => {
      const { token, errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown };
      if (errcode === 0) {
        dispatch(updateToken(token as string));
        message.success('登录成功');
        navigate('/')
      } else {
        message.error('登录失败');
      }
    })
  };

  const onFinishFailed = ({ values }: { values: IUser }) => {
    console.log('Failed:', values);
  };
  const autoLogin = (values: IUser) => {
    return () => {
      form.setFieldsValue(values) // 设置数据回显
      onFinish(values)
    }
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
        form={form}
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱' }
          ]}
        >
          <Input placeholder='请输入邮箱' autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pass"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' autoComplete="new-password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
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
