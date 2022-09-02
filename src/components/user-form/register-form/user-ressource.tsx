import { CurrentUserWithResponseOption, getCurrentUser, openmrsFetch } from '@openmrs/esm-framework';
import { mergeMap } from "rxjs/operators";
import { Profiles, Status, User } from '../administration-types';
import { uuidPhoneNumber } from '../constante';
const BASE_WS_API_URL = '/ws/rest/v1/';

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

export function getSynchronizedCurrentUser(
  opts: CurrentUserWithResponseOption
) {
  return getCurrentUser(opts).pipe(
    mergeMap(async (user) => user)
  );
}


export async function changeUserStatus(abortController: AbortController, users: any[], status: string) {
  await Promise.all(users.filter(function (user) {
    if (user.userProperties.status == Status.WAITING) {
      return false;
    }
    return true;
  }).map(async user => {
    if (status == Status.DISABLED) {
      await openmrsFetch(`${BASE_WS_API_URL}user/${user.uuid || user.id}`, {
        "method": "DELETE",
      })
      user.userProperties = {
        ...user.userProperties,
        status: Status.DISABLED,
      }
    }
    else if (status == Status.ENABLE) {

      user.userProperties = {
        ...user.userProperties,
        status: Status.ENABLE,
      }
      user.retired = false;
    }
    else {
      user.userProperties = {
        ...user.userProperties,
        status: Status.WAITING,
      }
      const newPassword = user.username.charAt(0).toUpperCase() + user.username.substring(1) + "123";
      user.retired = false;
      await resetPassword(abortController, newPassword, user.uuid)
    }
    return saveUser(abortController, user, user.uuid);
  }));
}

export async function changeUserProfile(abortController: AbortController, users: any[], profile: string) {
  await Promise.all(users.map(async (user, i) => {
    const id = `${profile}-${ i + (new Date().getTime())}`;
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
  if (roles?.length > 0 && object == undefined) {
    let rolesFormat = [];
    return roles.filter(role => role.display.startsWith("Module:"))
      .map(role => ({
        uuid: role.uuid,
        display: role.display,
      })
      )
    return rolesFormat;
  }
  else if (object)
    return roles.map(role => role.display);
}

export function checkProfile(systemId) {
  const profile = systemId?.split("-")[0];
  let value = "";
  Object.values(Profiles).forEach(
    p => {
      if (p == profile)
        value = p;
    }
  )
  return value;
}

export function formatUser(user: User, person?: any) {
  return {
    uuid: user?.uuid || undefined,
    username: user?.username || "",
    userProperties: {
      status: getStatusUser(user?.userProperties?.status, user?.retired),
      defaultLocale: user?.userProperties?.defaultLocale || "",
      defaultPage: user?.userProperties?.defaultPage || "",
    },
    person: {
      givenName: person?.names[0]?.givenName || "",
      familyName: person?.names[0]?.familyName || "",
      phone: person?.attributes?.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
      gender: user?.person?.gender || "",
    },
    roles: formatRole(user?.roles) || [],
    profile: checkProfile(user?.systemId),
    systemId: user?.systemId || ""
  }
}

export function resetPassword(abortController: AbortController, newPassword: string, uuid?: string) {
  return openmrsFetch(`${BASE_WS_API_URL}password/${uuid}`, {
    method: 'POST',
    body: {
      newPassword: newPassword
    },
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}

export function updatePassword(abortController: AbortController, oldPassword: string, newPassword: string) {
  return openmrsFetch(`${BASE_WS_API_URL}password`, {
    method: 'POST',
    body: {
      oldPassword: oldPassword,
      newPassword: newPassword
    },
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
const getUsers = (limit: number, start: number) =>
  openmrsFetch(`${BASE_WS_API_URL}user?&limit=${limit}&startIndex=${start}&v=full`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

export async function getAllUserPages(limit: number, start: number, username: string) {
  let data = await getUsers(limit, start);
  return data.data.results;
}

export async function getSizeUsers(username) {
  const users = await openmrsFetch(`${BASE_WS_API_URL}user`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return users.data.results.length;
}

export function getStatusUser(status, retired) {
  if (retired !== undefined || retired !== undefined) {
    if (status)
      return status;
    else if (retired == true)
      return Status.DISABLED
    else
      return Status.ENABLE
  }
  return Status.WAITING;
}
