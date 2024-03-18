import axiosClient from 'services/axiosClient';

export type UserResponse = {
  id: number;
};

export const getExistOrCreateUserId = async () => {
  const response = await axiosClient<number>({
    method: 'POST',
    url: '',
  });
  return response.data;
};

export const getStores = async (
  type?: string,
  page?: number,
  pageSize?: number,
) => {
  const params = {
    ...(type && {type}),
    ...(page && {page}),
    ...(pageSize && {pageSize}),
  };

  const response = await axiosClient({
    method: 'GET',
    url: '/store/list',
    params,
  });
  console.log('response.data', response.data);

  return response.data;
};
