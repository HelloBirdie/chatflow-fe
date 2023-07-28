import { AxiosResponse } from 'axios';

import apiClient from '@/utils/apiClient';

import { IUserEmailLogin, IUserEmailSignup } from '@/interfaces/user';

export const emailLogin = async (
  user: IUserEmailLogin,
): Promise<AxiosResponse<undefined>> =>
  apiClient.post('/auth/login/email', user);

export const emailSignup = async (
  user: IUserEmailSignup,
): Promise<AxiosResponse<undefined>> => apiClient.post('/users/signup', user);

export const googleLogin = async (
  accessToken: string,
): Promise<AxiosResponse<undefined>> =>
  apiClient.post('/auth/login/google', { accessToken });
