import { lazy } from "react";

const Dashboard = lazy(() => 
  import("@/pages/app/Dashboard")
)

const Menu = lazy(() => 
  import("@/pages/app/Menu")
)

const MenuRegist = lazy(() => 
  import("@/pages/app/MenuRegist")
)

const Order = lazy(() =>
  import("@/pages/app/Order")
)

const Setting = lazy(() => 
  import("@/pages/Setting")
)

const routes = [
  { path: '/', title: 'Home', element: Dashboard },
  { path: '/dashboard', title: 'DashBoard', element: Dashboard },
  { path: '/menu', title: 'Menu', element: Menu},
  { path: '/menu/regist', title: 'Menu-regist', element: MenuRegist},
  { path: '/menu/order', title: 'Order', element: Order},
  { path: '/menu/order/setting', title: 'Setting', element: Setting }
]

export default routes;