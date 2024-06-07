import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import {
  useGetRefreshTokenQuery,
  useLogoutMutation,
} from '@/redux/slices/usersApiSlice';

const useTokenRefreshControl = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data,
    error: queryError,
    isLoading: isRefreshing,
  } = useGetRefreshTokenQuery({});
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const loginControl = async () => {
      if (queryError?.status === 401) {
        dispatch(logout());
        navigate('/login');

        await logoutApiCall(undefined).unwrap();

        toast.success('Logged out');
        navigate('/login');
      }
    };

    loginControl();
  }, [navigate, data, queryError, isRefreshing, dispatch, logoutApiCall]);
};

export default useTokenRefreshControl;
