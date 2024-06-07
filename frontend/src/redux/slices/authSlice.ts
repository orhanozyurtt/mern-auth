import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Kullanıcı bilgileri tipi
interface UserInfo {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Başlangıç durumu
const initialState: { userInfo: UserInfo | null } = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

// Slice oluşturma
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Kullanıcı bilgilerini güncelleme
    setCredentials: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
      // Kullanıcı bilgilerini localStorage'a da kaydetme
      if (action.payload) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('userInfo');
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

// Action oluşturucuları
export const { setCredentials, logout } = authSlice.actions;

// Reducer fonksiyonu
export default authSlice.reducer;
