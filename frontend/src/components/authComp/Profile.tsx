import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { setCredentials } from '@/redux/slices/authSlice';

import { RootState } from '@/redux/store';
import { useUpdateUserMutation } from '@/redux/slices/usersApiSlice';
import Loader from '@/components/loader';
import useTokenRefreshControl from '@/hooks/control';

// üst imp

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ProfilePage: React.FC = () => {
  useTokenRefreshControl();
  const [name, setName] = useState<string>(''); //
  const [email, setEmail] = useState<string>(''); //
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // İsim değerini güncelle
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
        const res = await updateProfile({
          _id: userInfo?.id,
          name: name,
          email: email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated');
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
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10 ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Update Profile</CardTitle>
            <CardDescription>Update Form</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John"
                  value={name}
                  onChange={handleNameChange} // İsim değeri değiştiğinde handleFirstNameChange fonksiyonunu çağır
                />
              </div>
              <div className="grid gap-2 mt-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={handleEmailChange} // Email değeri değiştiğinde handleEmailChange fonksiyonunu çağır
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
              <div className="grid gap-2 mt-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange} // Şifre değeri değiştiğinde handlePasswordChange fonksiyonunu çağır
                />
              </div>
              {isLoading && <Loader />}
              <Button type="submit" className="w-full mt-3">
                Update
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
