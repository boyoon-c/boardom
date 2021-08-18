// stub up some services that connects the front-end to the back-end
import * as tokenService from './tokenService'
const BASE_URL="/api/activity/"

// update function that's going to add time information to the activity
export function updateActivity(act){
  return fetch(
    `${BASE_URL}editActivity/${act._id}`,
    {
      method: 'PUT', 
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(act)
  },
  {mode: 'cors'})
  .then((res)=>res.json())
    //something
}


// add function that's going to add activity to the user profile
export function addActivity(act) {
    return fetch(
      `${BASE_URL}addActivity`,
      {
        method: 'POST',
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(act)
      },
      { mode: "cors" })
    .then((res) => res.json())
  }

// remove function that's going to remove activity from the user profile
export function removeActivity(act) {
    return fetch(
      `${BASE_URL}removeActivity/${act}`,
      {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + tokenService.getToken()},
      },
      { mode: "cors" })
    .then((res) => res.json())
  }

// show function that's going to show random activity on some pages
// but need to figure out what type and query this might be 
export function search(participants, type) {
    return fetch(`${BASE_URL}search/${participants}/${type}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    }, {mode: "cors"})
    .then(res => res.json())
  }
