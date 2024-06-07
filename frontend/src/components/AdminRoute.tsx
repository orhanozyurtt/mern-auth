import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/', { replace: true });
    }
  }, [userInfo, navigate]);

  if (!userInfo?.isAdmin) {
    return null; // veya başka bir şey döndürebilirsiniz
  }

  return <Outlet />;
};

export default PrivateRoute;
