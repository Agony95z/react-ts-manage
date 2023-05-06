import React from 'react'
import styles from '../Home.module.scss'
import classNames from 'classnames'
import { BellOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Dropdown, message, Space, Badge } from 'antd';
const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const items2: MenuProps['items'] = [
  {
    label: '个人中心',
    key: '1',
  },
  {
    label: '退出',
    key: '2',
  }
];
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
export default function HomeHeader() {
  return (
    <div className={styles['home-header']} >
      <span className={styles['home-header-logo']}>
        <i className={classNames('iconfont icon-React', styles['icon-React'])}></i>
        <i className={classNames('iconfont icon-test', styles['icon-test'])}></i>
            <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
      </span>
      <span className={styles['home-header-title']}>在线考勤系统</span>
      <Dropdown menu={{ items, onClick }} arrow>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Badge dot>
              <BellOutlined style={{fontSize: 22}} />
            </Badge>
          </Space>
        </a>
      </Dropdown>
      <Dropdown menu={{ items: items2, onClick }} arrow className={styles['home-header-space']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> React用户
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}
