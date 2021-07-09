import axiosClient from '../apiClient';

export const addCollection = (partEmail, userId, token, newCollection) => {
  return axiosClient.post(partEmail + userId + '/collections.json?auth=' + token, newCollection);
}

export const deleteUserCollection = (partEmail, userId, queryParams) => {
  return axiosClient.delete(partEmail + userId + '/collections/' + queryParams);
}

export const updateUserCollection = (partEmail, userId, queryParams, collection) => {
  return axiosClient.put(partEmail + userId + '/collections/' + queryParams, collection);
}