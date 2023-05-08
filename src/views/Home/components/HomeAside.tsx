import React from 'react'
import {Menu} from 'antd'
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import styles from '../Home.module.scss'
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: '1',
    label: '菜单1',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '2',
        label: '菜单1-1',
        icon: <ContainerOutlined />
      }
    ]
  }
]
export default function HomeAside() {
  return (
    <>
      <Menu
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['1']}
        mode="inline"
        theme="light"
        inlineCollapsed={false}
        items={items}
        className={styles['home-aside']}
      />
    </>
  )
}
