import { Link } from 'react-router-dom';
import routes from '@/router/routes';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname: string, routes: any) => {
    const currentRoute = routes.find((route: any) => route.path === pathname);
    return currentRoute ? currentRoute.title : false;
  };

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: any = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          title:
            index + 1 === array.length ? (
              routeName
            ) : (
              <Link to={currentPathname}> {routeName} </Link>
            ),
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };
  const breadcrumbs = getBreadcrumbs(currentLocation);

  return <Breadcrumb items={breadcrumbs} />;
};

export default Breadcrumbs;
