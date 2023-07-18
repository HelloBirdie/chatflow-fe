import { AxiosResponse } from 'axios';

import apiClient from '@/utils/apiClient';

import { IUserEmailLogin } from '@/interfaces/user';

export const emailLogin = async (
  user: IUserEmailLogin,
): Promise<AxiosResponse<undefined>> =>
  apiClient.post('/auth/login/email', user);
