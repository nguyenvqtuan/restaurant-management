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

const Category= lazy(() => 
  import("@/pages/app/Category")
)

const CategoryRegist = lazy(() => 
  import("@/pages/app/CategoryRegist")
)

const Inventory = lazy(() => 
  import("@/pages/app/Inventory")
)

const InventoryRegist = lazy(() => 
  import("@/pages/app/InventoryRegist")
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
  { path: '/category', title: 'Category', element: Category},
  { path: '/category/regist', title: 'Category-regist', element: CategoryRegist},
  { path: '/inventory', title: 'Invenroy', element: Inventory},
  { path: '/inventory/regist', title: 'Inventory-regist', element: InventoryRegist},
  { path: '/menu/order', title: 'Order', element: Order},
  { path: '/menu/order/setting', title: 'Setting', element: Setting }
]

export default routes;