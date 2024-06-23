import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Sidebar = () => {
  return (<CSidebar
    className="border-end"
    colorScheme="dark"
    position="fixed"
  >
    <CSidebarHeader className="border-bottom">
      <CSidebarBrand>
        <CIcon customClassName="sidebar-brand-full" />
        <CIcon customClassName="sidebar-brand-narrow" />
      </CSidebarBrand>
      <CCloseButton
        className="d-lg-none"
        dark
      />
    </CSidebarHeader>
    <CSidebarFooter className="border-top d-none d-lg-flex">
      <CSidebarToggler
      />
    </CSidebarFooter>
  </CSidebar>
  )
}

export default Sidebar