import { AxiosResponse } from 'axios';

import apiClient from '@/utils/apiClient';
import { ICardAdd } from '@/interfaces/card';

export const addMindmap = async (
    mindmap: ICardAdd,
  ): Promise<AxiosResponse<undefined>> => apiClient.post('/mindmap/add', mindmap);
  

export const getAllMindmaps = async (): Promise<AxiosResponse<undefined>> =>
  apiClient.get('/mindmap/getAllMindmaps');
