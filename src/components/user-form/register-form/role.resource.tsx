import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
const BASE_WS_API_URL = '/ws/rest/v1/';

export function performLogin(username, password) {
  const token = window.btoa(`${username}:${password}`);
  return openmrsFetch(`${BASE_WS_API_URL}session`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((res) => {
    refetchCurrentUser();
    return res;
  });
}

export function geUserByEmailOrUsername(identifier: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user?username=${identifier}`);
}

export function getAllRoles() {
  return openmrsFetch(`${BASE_WS_API_URL}role`);
}