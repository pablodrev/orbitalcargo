import {StrictMode, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { Layout } from "./shared/ui/layout";
import { AuthPage } from "./pages/auth";
import { store } from "./app/store.ts";
import {Provider} from "react-redux";
import {initAuth} from "./features/auth/model/authSlice.ts";
import {useAppDispatch} from "./hooks/dispatch.ts";
import {ProtectedRoute} from "./shared/ui/protected-route/ProtectedRoute.tsx";
import {TestPage} from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'test',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: '',
            element: <TestPage />
          }
        ]
      }
    ],
  }
]);

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
