import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoLogIn } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import DropdownMenu from '@/components/DropdownManu';
import { useLogoutMutation } from '@/redux/slices/usersApiSlice';
import { toast } from 'react-toastify';

const NavMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      toast.success('Logged out');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-blue-500 flex justify-between p-4">
      <div className="ml-5">
        <a href="/">
          <span className="text-2xl font-bold hover:text-yellow-200">LOGO</span>
        </a>
      </div>
      <h1 className="text-center">MERN STACK</h1>
      <div>
        <ul className="flex gap-4">
          <li className="hover:text-white">
            <NavLink to="/">HOME</NavLink>
          </li>
          {!userInfo ? (
            <li className="hover:text-white">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLogin}
              >
                <IoLogIn className="text-2xl mr-1" />
                <span>LOGIN</span>
              </div>
            </li>
          ) : (
            <>
              <li className="hover:text-white">
                <DropdownMenu onLogout={handleLogout} />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
