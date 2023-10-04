import { AxiosResponse } from 'axios';

import apiClient from '@/utils/apiClient';
import { IMesssageAdd } from '@/interfaces/message';

export const addMessage = async (
  newMessage: IMesssageAdd,
): Promise<AxiosResponse<undefined>> => apiClient.post('/messages', newMessage);

// export const getAllMindmaps = async (): Promise<AxiosResponse<undefined>> =>
//   apiClient.get('/mindmap/getAllMindmaps');
