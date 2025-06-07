import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserProfile } from '@/interfaces/user';

export const fetchUser = createAsyncThunk<IUserProfile, void>(
  '/users/myInfo',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return rejectWithValue('No token found');
      }

      const response = await fetch(
        'http://localhost:8080/api/v1/users/myInfo',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error && data.status !== 200) {
        window.location.href = '/login';
        return rejectWithValue(data.error);
      }
      return data;
    } catch (err) {
      console.error('Error fetching user info:', err);
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch user info');
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
