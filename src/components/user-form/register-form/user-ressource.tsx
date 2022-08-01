import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
import { VirtualAction } from 'rxjs';
import { User } from '../administration-types';
import { uuidPhoneNumber } from '../constante';
const BASE_WS_API_URL = '/ws/rest/v1/';

export const profiles = [{ display: "doctor", value: "doctor" }, { display: "nurse", value: "nurse" }, { display: "admin", value: "admin" }];
export const status = [{ display: "enable", value: "enable" }, { display: "disabled", value: "disabled" }, { display: "waiting", value: "waiting" }]
export const locales = [{ display: "french", value: "fr" }, { display: "english", value: "en" }, { display: "creole", value: "kr" }];
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

export function geUserCriteria(identifier: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user?q=${identifier}&includeAll=true&v=full&limit=1`);
}

export function geUserByUuid(uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}user/${uuid}?v=full`);
}
export async function getPerson(uuid: string) {
  if (uuid)
    return openmrsFetch(`${BASE_WS_API_URL}person/${uuid}?v=full`);
  return undefined;
}

export function getAllRoles() {
  return openmrsFetch(`${BASE_WS_API_URL}role`);
}



export async function changeUserStatus(abortController: AbortController, users: any[], status: string) {
  const res = await Promise.all(users.map(async user => {
    if (status == "disabled") {
      return openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid || user.id}`, {
        "method": "DELETE",
      })
    }
    else if (status == "enable")
      user.userProperties = {
        ...user.userProperties,
        forcePassword: "false",
        // defaultLocale: user.userProperties.defaultLocale 
      }
    else
      user.userProperties = {

        ...user.userProperties,
        forcePassword: "true",
        // defaultLocale: user.userProperties.defaultLocale
      }
    user.retired = false;
    return saveUser(abortController, user, user.uuid);
  }));
}

export async function changeUserProfile(abortController: AbortController, users: any[], profile: string) {
  await Promise.all(users.map(async (user, i) => {
    const id = profile + '-' + i + new Date().getTime();
    await openmrsFetch(`${BASE_WS_API_URL}user/${user.id}`, {
      method: 'POST',
      body: {
        systemId: id,
      },
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal
    });
  }));
}

export async function updateUserRoles(abortController: AbortController, users: any[], roles: any[]) {
  if (users.length > 0 && roles.length > 0) {
    let userRoles = new Set([...roles.map(role => role.uuid)])
    await Promise.all(users.map(async (user, i) => {
      const rolesUser = await (await geUserByUuid(user.id || user.uuid)).data.roles;
      Promise.all(rolesUser.map(role => userRoles.add(role.uuid)));
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.id || user.uuid}`, {
        method: 'POST',
        body: {
          roles: [...userRoles],
        },
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
      });
    }
    ));
  }
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

export function formatUser(user: User, person?: any) {
  return {
    uuid: user?.uuid || "",
    username: user?.username || "",
    defaultLocale: user?.userProperties?.defaultLocale || "",
    forcePassword: user?.userProperties?.forcePassword || null,
    person: {
      givenName: person?.names[0]?.givenName || "",
      familyName: person?.names[0]?.familyName || "",
      phone: person?.attributes?.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
      gender: user?.person?.gender || "",
    },
    status: getStatusUser(user?.retired, user?.userProperties?.forcePassword) || "",
    roles: formatRole(user?.roles) || [],
    profile: user?.systemId?.split("-")[0] || "",
    systemId: user?.systemId || ""
  }
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

export function getStatusUser(retired, forcePassword) {
  if (retired !== undefined || forcePassword !== undefined) {
    if (retired === true)
      return "disabled";
    else if (forcePassword == "true")
      return "waiting"
    else
      return "enable";
  }
  return ""
}
