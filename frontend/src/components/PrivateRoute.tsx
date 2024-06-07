import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { replace: true });
    }
  }, [userInfo, navigate]);

  return userInfo ? <Outlet /> : null;
};

export default PrivateRoute;
