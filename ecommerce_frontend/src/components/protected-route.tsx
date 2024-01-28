import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
}
const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
}: Props) => {
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Login to Continue");
    }
    if (adminRoute && !isAdmin) {
      toast.error("Login To Admin Account");
    }
  }, [isAuthenticated, adminRoute, isAdmin]);

  if (!isAuthenticated || (adminRoute && !isAdmin)) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

export const ProtectedAuthRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
}: Props) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (adminRoute && !isAdmin) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};
