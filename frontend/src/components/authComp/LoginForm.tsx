import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { FaGoogle } from 'react-icons/fa';
// import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/redux/slices/usersApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import Loader from '@/components/loader';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // string türünde başlangıç değeri boş bir dize
  const [password, setPassword] = useState<string>(''); // string türünde başlangıç değeri boş bir dize
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  // localStorage içindeki auth alanını çağırıyor

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // eğer kullanıcı bilgisi var ise anasayfaya yönlendir bu işlem login sayfasına girerken tetiklenir
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // E-posta değerini güncelle
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Şifre değerini güncelle
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Form gönderimini engelle
    try {
      const res = await login({ email, password }).unwrap();
      // console.log('response : ', res);
      dispatch(setCredentials({ ...res }));
      toast.success('Login Successfully');
      navigate('/');
    } catch (error: unknown) {
      // Burada, error nesnesinin { data?: { message?: string } } türünde olduğunu belirtiriz.
      // error as ifadesi error nesnesinin belirli bir türe sahip olduğunu belirtir
      const errorMessage = (error as { data?: { message?: string } })?.data
        ?.message;
      if (errorMessage) {
        toast.error(errorMessage + ' || mail veya parola hatalı');
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            {' '}
            {/* Form gönderildiğinde handleSubmit fonksiyonunu çağır */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={handleEmailChange} // E-posta değeri değiştiğinde handleEmailChange fonksiyonunu çağır
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange} // Şifre değeri değiştiğinde handlePasswordChange fonksiyonunu çağır
              />
            </div>
            <div className="flex">
              {isLoading && <Loader />}
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isLoading}
              >
                Login account
              </Button>
            </div>
            <div className="flex justify-center mt-3">
              <NavLink to="/register">
                <Button variant="outline" className="w-full">
                  Create an account
                </Button>
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
/*
<div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <FaGithub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground mb-5">
                Or continue with
              </span>
            </div>
          </div>


*/
