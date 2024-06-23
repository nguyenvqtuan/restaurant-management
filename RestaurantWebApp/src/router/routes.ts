import { lazy } from "react";

const Home = lazy(() => 
  import("@/pages/app/Dashboard")
)
const Dashboard = lazy(() => 
  import("@/pages/app/Dashboard")
)

const Menu = lazy(() => 
  import("@/pages/app/Menu")
)

const Order = lazy(() =>
  import("@/pages/app/Order")
)

const routes = [
  { path: '/', title: 'Home' },
  { path: '/dashboard', title: 'DashBoard' },
  { path: '/menu', title: 'Menu'},
  { path: '/menu/order', title: 'Order'},
  { path: '/menu/order/setting', title: 'Setting'}
 
]

export default routes;