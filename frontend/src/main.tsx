import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/global.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./shared/ui/layout";
import { AuthPage } from "./pages/auth";
import { store } from "./app/store.ts";
import {Provider} from "react-redux";
// import {initAuth} from "./features/auth/model/authSlice.ts";
// import {useAppDispatch} from "./hooks/dispatch.ts";
import {ProtectedRoute} from "./shared/ui/protected-route/ProtectedRoute.tsx";
// import {TestPage} from "./pages/test";
import {CreateOrderPage} from "./pages/create-order";
import { OrdersPage } from './pages/orders/index.ts';
import {DashboardPage} from "./pages/dashboard";
import {HomePage} from "./pages/home";
import {CargoAssignPage} from "./pages/cargo-assign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: 'operator',
        element: <ProtectedRoute allowedRoles={['operator']} />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />
          }
        ]
      },
      {
        path: 'manager',
        element: <ProtectedRoute allowedRoles={['manager']} />,
        children: [
          {
            path: 'createOrder',
            element: <CreateOrderPage />
          },
          {
            path: 'orders',
            element: <OrdersPage/>,
          },
          {
            path: 'assignCargo',
            element: <CargoAssignPage />
          }
        ]
      },
    ],
  }
]);

export function App() {
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(initAuth());
  // }, [dispatch]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
