
import axiosManager, { ServiceAPI } from '../axiosManager';
import { queryOptions } from '@tanstack/react-query';

const queryKeys: string[] = ['authStatus'];
const getAuthStatus = async () => {
  const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const response = await axios.get('authStatus');
  const data: boolean = response.data;

  return {data};
 };

 export const getAuthStatusOptions = () =>
  queryOptions({
    queryKey: queryKeys,
    queryFn: getAuthStatus,
  });
  