import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserProfile } from '@/interfaces/user';

export const fetchUser = createAsyncThunk<IUserProfile, void>(
  '/users/myInfo',
  async () => {
    try {
      // const response = await getUserInfo();
      // console.log(response.data);
      // return response.data;
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:8080/api/v1/users/myInfo',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      if (data.error && data.status !== 200) {
        // redirect to login page
        window.location.href = '/login';
      }
      return data;
    } catch (err) {
      // return thunkAPI.rejectWithValue("Failed to fetch issues.");
      console.log(err);
    }
  },
);

interface UserState {
  profile: {
    id: number;
    username: string;
    email: string;
    avatar: string;
    subscriptionLevel: number;
    userSetting: any;
    createTime: string;
    updateTime: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: {
    id: 0,
    username: '',
    email: '',
    avatar: '',
    subscriptionLevel: 0,
    userSetting: '',
    createTime: '',
    updateTime: '',
  },
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'something went wrong';
      });
  },
});

export default userSlice.reducer;
