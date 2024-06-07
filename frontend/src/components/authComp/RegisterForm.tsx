import React, { useEffect, useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useRegisterMutation } from '@/redux/slices/usersApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

const RegisterForm: React.FC = () => {
  const [name, setFirstName] = useState<string>(''); // İsim alanı için state
  // const [lastName, setLastName] = useState<string>(''); // Soyisim alanı için state
  // const [phone, setPhone] = useState<string>(''); // Numara alanı için state
  const [email, setEmail] = useState<string>(''); // Email alanı için state
  const [password, setPassword] = useState<string>(''); // Şifre alanı için state
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Şifre alanı için state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value); // İsim değerini güncelle
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Email değerini güncelle
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Şifre değerini güncelle
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value); // Şifre değerini güncelle
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Form gönderimini engelle
    // Formu gönderme işlemleri burada gerçekleştirilebilir
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('registration successful');
        navigate('/');
      } catch (error: unknown) {
        // Burada, error nesnesinin { data?: { message?: string } } türünde olduğunu belirtiriz.
        // error as ifadesi error nesnesinin belirli bir türe sahip olduğunu belirtir
        const errorMessage = (error as { data?: { message?: string } })?.data
          ?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    }
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    // console.log('Phone:', phone);
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center bg-blue-400 h-screen ">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John"
                value={name}
                required
                onChange={handleFirstNameChange} // İsim değeri değiştiğinde handleFirstNameChange fonksiyonunu çağır
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                required
                onChange={handleEmailChange} // Email değeri değiştiğinde handleEmailChange fonksiyonunu çağır
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                required
                onChange={handlePasswordChange} // Şifre değeri değiştiğinde handlePasswordChange fonksiyonunu çağır
              />
            </div>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                required
                onChange={handleConfirmPasswordChange} // Şifre değeri değiştiğinde handlePasswordChange fonksiyonunu çağır
              />
            </div>
            {isLoading && <Loader />}
            <Button type="submit" className="w-full mt-3">
              Create account
            </Button>
          </form>
          <div className="flex justify-center">
            <NavLink to="/login">
              <Button variant="outline" className="w-full">
                Already have an account
              </Button>
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
