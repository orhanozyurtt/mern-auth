import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '@/pages/login';
import Register from '@/pages/register';
import Home from '@/pages/home';
import Admin from '@/pages/admin';

import Profile from '@/pages/profile';
import PrivateRoute from '@/components/PrivateRoute';
import NavMenu from './components/NavMenu';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from '@/components/AdminRoute';
import NotFound from './components/NotFound';
// import { getIsAdmin } from './lib/utils';
function App() {
  // getIsAdmin();
  return (
    <BrowserRouter>
      <NavMenu />
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* private routes  */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="" element={<AdminRoute />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
