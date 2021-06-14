import axiosClient from '../apiClient';

export const addItem = (item, token) => {
  return axiosClient.post(item.partEmail + item.userId + '/items.json?auth=' + token, item);
}

export const deleteUserItem = (partEmail, userId, queryParams) => {
  return axiosClient.delete(partEmail + userId + '/items/' + queryParams);
}