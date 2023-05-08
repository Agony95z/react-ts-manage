import React from 'react'
import { Breadcrumb } from 'antd';
import styles from '../Home.module.scss'
export default function HomeBreadcrumb() {
  return (
    <Breadcrumb
    className={styles['home-breadcrumb']}
    items={[
      {
        title: 'Home',
      },
      {
        title: <a href="">Application Center</a>,
      },
      {
        title: <a href="">Application List</a>,
      },
      {
        title: 'An Application',
      },
    ]}
  />
  )
}
