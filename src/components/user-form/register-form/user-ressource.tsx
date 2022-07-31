import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
import { VirtualAction } from 'rxjs';
import { User } from '../administration-types';
import { uuidPhoneNumber } from '../constante';
const BASE_WS_API_URL = '/ws/rest/v1/';

export const profiles = [{ display: "doctor", value: "doctor" }, { display: "nurse", value: "nurse" }, { display: "admin", value: "admin" }];
export const status = [{ display: "enable", value: "enable" }, { display: "disabled", value: "disabled" }, { display: "waiting", value: "waiting" }]

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



export async function changeUserStatus(abortController: AbortController, users: string | any[], status: string) {

  let usersToEdit = [{ uuid: "", username: "" }];
  if (typeof users === "string")
    usersToEdit.push({ uuid: users, username: null });
  else
    usersToEdit = users.map(user => ({ uuid: user.cells[7].value, username: user.cells[6].value }))
  const res = await Promise.all(usersToEdit.map(async user => {
    console.log("changeUserStatus", status," users=====",user);

    if (status == "enable")
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid}`, {
        method: 'POST',
        body: {
          retired: false,
          userProperties: {
            forcePassword: "false"
          },
        },
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
      });
    else if (status == "disabled")
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid}`, {
        "method": "DELETE",
      })
    else
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid}`, {
        method: 'POST',
        body: {
          userProperties: {
            forcePassword: "true"
          },
          password: user.username + "A123",
        },
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
      });
  }));
}

export async function changeUserProfile(abortController: AbortController, users: any[], profile: string) {
  const usersToEdit = users.map(user => ({ uuid: user.cells[7].value, profile: user.cells[4].value }))
  await Promise.all(usersToEdit.map(async (user, i) => {
    if (user.profile !== profile) {
      const id = profile + '-' + i + new Date().getTime();
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid}`, {
        method: 'POST',
        body: {
          systemId: id,
        },
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
      });
    }
  }));
}

export async function updateUserRoles(abortController: AbortController, users: any[], roles: any[]) {
  if (users.length > 0 && roles.length > 0) {
    let userRoles = new Set([...roles.map(role => role.uuid)])
    await Promise.all(users.map(async (user, i) => {
      const rolesUser = await (await geUserByUuid(user.cells[7].value)).data.roles;
      Promise.all(rolesUser.map(role => userRoles.add(role.uuid)));
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.cells[7].value}`, {
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
    userProperties: {
      defaultLocale: user?.userProperties.defaultLocale || "",
      forcePassword: user?.userProperties.forcePassword || ""
    },
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

export function getStatusUser(retired, forcePassword) {
  if (retired !== undefined || forcePassword !== undefined) {
    if (forcePassword == "true")
      return "waiting"
    else if (retired === true)
      return "disabled";
    else
      return "enable";
  }
  return ""
}
