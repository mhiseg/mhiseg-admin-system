import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
import { User } from '../administration-types';
import { uuidPhoneNumber } from '../constante';
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
  return openmrsFetch(`${BASE_WS_API_URL}user?q=${identifier}&includeAll=true&v=full&limit=1`);
}

async function getPerson(uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}person/${uuid}?v=full`);
}

export function getAllRoles() {
  return openmrsFetch(`${BASE_WS_API_URL}role`);
}


export function disabledUser(uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user/${uuid}`, {
    "method": "DELETE",
  });
}

export function formatRole(roles) {
  return roles.map(role => ({
    uuid: role.uuid,
    display: role.display,
  }));
}

export async function formatUser(user: User) {
  const person = await (await getPerson(user.person.uuid)).data;
  console.log('formatUser:', user);
  return {
    uuid: user?.uuid,
    username: user?.username,
    userProperties: user?.userProperties === undefined ? { defaultLocale: "", forcePassword: undefined } : user?.userProperties,
    person: {
      givenName: person?.names[0]?.givenName,
      familyName: person?.names[0]?.familyName,
      phone: person?.attributes.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
      gender: user?.person?.gender,
    },
    retired: user?.retired || false,
    roles: formatRole(user?.roles),
    profil: user?.systemId?.split("-")[0],
    systemId: user?.systemId
  }
}

export function forcePassword(abortController: AbortController, uuid: string, username: string, password: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user/${uuid ? uuid : ""}`, {
    method: 'POST',
    body: {
      userProperties: {
        forcePassword: "true"
      },
      password: username+"A123",
    },
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}

export function resetPassword(abortController: AbortController, user: User, uuid?: string) {
    return openmrsFetch(`${BASE_WS_API_URL}password/${uuid}`, {
      method: 'POST',
      body: user,
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal
    });
  }

export function saveUser(abortController: AbortController, user: User, uuid?: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user/${uuid ? uuid : ""}`, {
    method: 'POST',
    body: user,
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}