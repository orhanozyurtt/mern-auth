import { useEffect } from 'react';
import { useGetAdminInfoQuery } from '@/redux/slices/usersApiSlice';
import { toast } from 'react-toastify';
import useTokenRefreshControl from '@/hooks/control';
const AdminPage = () => {
  useTokenRefreshControl();
  const { data: admin, error, isLoading } = useGetAdminInfoQuery(undefined);

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        'An unknown error occurred';

      toast.error(errorMessage);
    }
  }, [error]); // error bağımlılığı burada belirtildi

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      (error as { data?: { message?: string } })?.data?.message ||
      'An unknown error occurred';

    return <div>Error: {errorMessage}</div>;
  }

  return <div>{admin && <div>{admin.message}</div>}</div>;
};

export default AdminPage;
