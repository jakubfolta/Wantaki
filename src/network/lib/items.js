import axiosClient from '../apiClient';

export const addItem = (item, token) => {
  return axiosClient.post(`${item.partEmail}${item.userId}/items.json?auth=${token}`, item);
}

export const deleteUserItem = (partEmail, userId, queryParams) => {
  return axiosClient.delete(`${partEmail}${userId}/items/${queryParams}`);
}

export const updateUserItem = (partEmail, userId, queryParams, item) => {
  return axiosClient.put(`${partEmail}${userId}/items/${queryParams}`, item);
}

export const fetchUserData = (user, partEmail, userId) => {
  const url = user
    ? `.json?orderBy="uuid"&equalTo="${user}"`
    : `${partEmail}${userId}.json`;

    return axiosClient.get(url);
}