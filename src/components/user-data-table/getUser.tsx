import { openmrsFetch } from "@openmrs/esm-framework";

const BASE_WS_API_URL = '/ws/rest/v1/';
export const BASE_FH_API_URL = "/ws/fhir2/R4/"
const toDay = new Date();

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


function checkUndefined(value) {
    return (value !== null && value !== undefined) ? value : "";
}
function checkProfiles(value) {
    return (value == "nurse" || value == "doctor") ? value : "Unknown";
}


export async function getUsers(items) {
    return Promise.all(
        items.map(async (item, i) => {
            console.log(item.retired)
            return {
                id: i,
                uuid: item?.uuid,

                Username: item?.username,

                fullName: item?.person.display,

                gender: item?.person.gender,

                statut: (item?.retired).toString(),

                profil: checkProfiles(item.systemId.split('-')[0]),

                email: ""
            }
        }));
}