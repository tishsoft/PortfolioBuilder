import Root from './Root';
import Home from './screens/Home/Main';
import Notif from './screens/Notif/Main';
import Settings from './screens/Settings/Main';
import Portfolio from '../components/Portfolio/Main';
import Terms from './screens/Terms';
import Privacy from './screens/Privacy'
import NotFound from '../components/NotFound';
import appRoute from '../data/appRoute';

const getTabsRoutes = (username) => {
  const tabsRoutes = [
    {
      path: appRoute('userProfile')(username),
      exact: true,
      component: Portfolio
    },
    {
      path: appRoute('userProfileTab')(username),
      component: Portfolio
    }
  ];
  return tabsRoutes;
};

const getRoutes = (user) => {

  const username = user.username;

  const routes = [
    {
      component: Root,
      routes: [
        {
          path: appRoute('userHome'),
          exact: true,
          component: Home
        },
        {
          path: appRoute('userSettings')(username),
          exact: true,
          component: Settings
        },
        {
          path: appRoute('userNotif'),
          exact: true,
          component: Notif
        },
        {
          path: appRoute('terms'),
          component: Terms
        },
        {
          path: appRoute('privacy'),
          component: Privacy
        },
        {
          path: appRoute('userProfile')(username),
          component: Portfolio,
          routes: getTabsRoutes(username)
        },
        {
          path: appRoute('userWildcard'),
          component: NotFound
        }
      ]
    }
  ];
  return routes;
};

// Caller:
// getRoutes is used by App.js
// getNav is used by TopNav.js
export { getRoutes };
