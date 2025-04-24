import {
  logOut,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!token) {
    // return <Navigate to="/login" replace />;
    return <Navigate to="/login" state={{ from: location }} replace />;

  }

  let user;

  try {
    user = verifyToken(token);
  } catch (error) {
    dispatch(logOut());
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
