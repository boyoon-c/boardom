// stub up some services that connects the front-end to the back-end
import * as tokenService from './tokenService'
const BASE_URL="/api/activity/"

// add function that's going to add activity to the user profile
export function addActivity(act) {
    return fetch(
      `${BASE_URL}add`,
      {
        method: 'POST',
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(act)
      },
      { mode: "cors" })
    .then((res) => res.json())
  }

// remove function that's going to remove activity from the user profile
export function removeMedia(api_id) {
    return fetch(
      `${BASE_URL}remove/${api_id}`,
      {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + tokenService.getToken()},
      },
      { mode: "cors" })
    .then((res) => res.json())
  }

// show function that's going to show random activity on some pages
// but need to figure out what type and query this might be 
export function show(type, query) {
    return fetch(`${BASE_URL}show/${type}/${query}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    }, {mode: "cors"})
    .then(res => res.json())
  }
