import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SemiProtectedRoute = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return !isAuth ? (
    <Navigate to={`/`} />
  ) : isAuth && user && user.activated ? (
    <Navigate to={`/messages`} />
  ) : (
    <Outlet />
  );
};

export default SemiProtectedRoute;
