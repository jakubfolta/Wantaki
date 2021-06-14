import axiosClient from '../apiClient';

export const setUserUuid = (emailUserId, token, user) => {
  return axiosClient.put('/' + emailUserId + '.json?auth=' + token, user);
}

export const getUserUuid = (emailUserId, token) => {
  return axiosClient.get('/' + emailUserId + '.json?auth=' + token);
}