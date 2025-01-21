import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './paginas/home';
import Today from './paginas/today';
import ThisWeek from './paginas/thisweek';
import ThisMonth from './paginas/thismonth';
import Cadastro from './paginas/cadastro';
import Login from './paginas/login';
import { useAuth } from "./functions/authProvider";
import { ProtectedRoute } from "./components/protectedRoute";

const AuthRouter = ()=> {
  const { token } = useAuth();

  const routesForNotAuthenticatedOnly = [
    {
      path: "/cadastro",
      element: <Cadastro />,
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/today",
          element: <Today />,
        },
        {
          path: "/thisweek",
          element: <ThisWeek />,
        },
        {
          path: "/thismonth",
          element: <ThisMonth />,
        }
        // {
        //   path: "/logout",
        //   element: <div>Logout</div>,
        // },
      ],
    },
  ];

  const router = createBrowserRouter([
    //...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default AuthRouter;
