import { Navigate } from "react-router-dom";
import {useAppSelector} from "../../../hooks/rootState.ts";
import {Outlet} from "react-router";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { isAuth, loading, role } = useAppSelector((state) => state.auth);

  if (loading) {
    return <p>Загрузка...</p>; // можно сделать спиннер
  }

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
