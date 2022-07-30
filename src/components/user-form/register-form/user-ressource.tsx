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
  if (uuid)
    return openmrsFetch(`${BASE_WS_API_URL}person/${uuid}?v=full`);
  return undefined;
}

export function getAllRoles() {
  return openmrsFetch(`${BASE_WS_API_URL}role`);
}


export function disabledUser(uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user/${uuid}`, {
    "method": "DELETE",
  });
}

export function formatRole(roles, object?) {
  if (roles?.length > 0 && object == undefined)
    return roles.map(role => ({
      uuid: role.uuid,
      display: role.display,
    }));
  else if (object)
    return roles.map(role => role.display);
}

export async function formatUser(user: User) {

  const person = await (await getPerson(user?.person?.uuid))?.data || undefined;
  return {

    uuid: user?.uuid,
    username: user?.username,
    userProperties: user?.userProperties === undefined ? { defaultLocale: "", forcePassword: undefined } : user?.userProperties,
    person: {
      givenName: person?.names[0]?.givenName,
      familyName: person?.names[0]?.familyName,
      phone: person?.attributes?.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
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
      password: username + "A123",
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


export async function getCurrentUserRoleSession() {
  let CurrentSession;
  await openmrsFetch(`${BASE_WS_API_URL}session`).then(data => { CurrentSession = data.data.user.systemId.split("-")[0] });
  return CurrentSession;
}

export function getAllUserPages(limit: number, start: number) {
  return openmrsFetch(`${BASE_WS_API_URL}user?&limit=${limit}&startIndex=${start}&v=full`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function getSizeUsers() {
  return openmrsFetch(`${BASE_WS_API_URL}user`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

function checkProfiles(value) {
  switch (value) {
    case 'nurse':
      return
  }
  return (value == "nurse" || value == "doctor") ? value : "Unknown";
}

function getStatusUSer(retired, forcePassword) {
  if (forcePassword && forcePassword == "true")
    return "waiting";
  else if (retired == true)
    return "desabled";
  else
    return "enable";
}

export async function getUsers(items) {
  return Promise.all(
    items.map(async (item, i) => {
      return {
        id: i,
        uuid: item?.uuid,
        Username: item?.username,
        fullName: item?.person.display,
        gender: item?.person.gender,
        statut: getStatusUSer(item?.retired, item?.userProperties?.forcePassword),
        profil: checkProfiles(item.systemId.split('-')[0]),
        roles: item?.roles?.length > 1 ? item.roles[0].display + ", " + item.roles[1].display : item?.roles[0]?.display,
        phone: item?.person.attributes?.find( (attribute) => attribute?.display.split(" = ")[0] == "Telephone Number" )?.display.split("Telephone Number = ")[1],
      }
    }))
}

