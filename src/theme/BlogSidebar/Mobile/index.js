/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import Link from '@docusaurus/Link'
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common'
import styles from './styles.module.css'

function BlogSidebarMobileSecondaryMenu({ sidebar }) {
  let cachedYear = null
  return (
    <ul className="menu__list blog-menu__list">
      {sidebar.items.map((item, ix) => {
        const postYear = item.permalink.split('/')[2]
        const yearHeader = cachedYear !== postYear && (
          <h5 className={styles.sidebarItemTitle}>{postYear}</h5>
        )
        cachedYear = postYear
        return (
          <Fragment key={item.permalink + ix}>
            {yearHeader}
            <li key={item.permalink} className="menu__list-item">
              <Link
                isNavLink
                to={item.permalink}
                className="menu__link"
                activeClassName="menu__link--active"
              >
                {item.title}
              </Link>
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}
export default function BlogSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  )
}
