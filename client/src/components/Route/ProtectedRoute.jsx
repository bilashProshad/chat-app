import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  // return isAuth && user && !user.activated ? (<Navigate to={`/activate`} />) : (<Outlet />);

  return !isAuth ? (
    <Navigate to={`/`} />
  ) : isAuth && user && !user.activated ? (
    <Navigate to={`/activate`} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
