import axios from 'axios';
import axiosClient from '../apiClient';

export const addCollection = (partEmail, userId, token, newCollection) => {
  return axiosClient.post(`${partEmail}${userId}/collections.json?auth=${token}`, newCollection);
}

export const deleteUserCollection = (partEmail, userId, queryParams) => {
  return axiosClient.delete(`${partEmail}${userId}/collections/${queryParams}`);
}

export const updateUserCollectionAndItems = (partEmail, userId, token, queryParams, collection, items) => {
  const updateCollection = axiosClient.put(`${partEmail}${userId}/collections/${queryParams}`, collection);
  const updateItems = axiosClient.put(`${partEmail}${userId}/items.json?auth=${token}`, items);

  return axios.all([updateCollection, updateItems]);
}

export const renameCollection = (partEmail, userId, token, queryParams, collection) => {
  return axiosClient.put(`${partEmail}${userId}/collections/${queryParams}`, collection);
}