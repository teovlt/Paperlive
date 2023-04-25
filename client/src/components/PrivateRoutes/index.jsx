import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoutes;
