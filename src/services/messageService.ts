import { AxiosResponse } from 'axios';

import apiClient from '@/utils/apiClient';
import { IMesssageAdd } from '@/interfaces/message';

interface IPageParams {
  mindmapId: number;
  page: number;
  size: number;
}

export const addMessage = async (
  newMessage: IMesssageAdd,
): Promise<AxiosResponse<undefined>> => apiClient.post('/messages', newMessage);

export const getAllConversationPairs = async (
  pageParams: IPageParams,
): Promise<AxiosResponse<undefined>> =>
  apiClient.get('/conversation-pairs/getAllConversationPairs', {
    params: { ...pageParams },
  });
