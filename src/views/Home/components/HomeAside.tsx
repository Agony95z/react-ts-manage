import { Menu } from 'antd'
import type { MenuProps } from 'antd';
import { RootState } from '../../../store';
import { routes } from '../../../router';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import { matchRoutes, useLocation, Link } from 'react-router-dom';
import styles from '../Home.module.scss'
type MenuItem = Required<MenuProps>['items'][number];
export default function HomeAside() {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  const subMenu = matchs![0].pathnameBase // 一级路由
  const secondMenu = matchs![1].pathnameBase // 一级路由
  const permission = useSelector((state: RootState) => state.users.infos.permission) as string[]
  const menus = _.cloneDeep(routes).filter(item => {
    // v.meta?.menu　路由作为菜单项
    // 筛选children中的作为menu的子项
    item.children = item.children?.filter(v => v.meta?.menu && permission.includes(v.name as string))
    // 返回符合条件的item
    return item.meta?.menu && permission.includes(item.name as string)
  })
  const items: MenuItem[] = menus.map(menu => {
    const children = menu.children?.map(child => {
      return {
        key: menu.path! + child.path!,
        // 引入二级路由跳转
        label: <Link to={ menu.path! + child.path! }> {child.meta?.title} </Link>,
        icon: child.meta?.icon
      }
    })
    return {
      key: menu.path!,
      label: menu.meta?.title,
      icon: menu.meta?.icon,
      children,
    }
  })
  return (
    <>
      <Menu
        defaultSelectedKeys={[secondMenu]}
        defaultOpenKeys={[subMenu]}
        mode="inline"
        theme="light"
        items={items}
        className={styles['home-aside']}
      />
    </>
  )
}
