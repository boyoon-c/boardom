import * as tokenService from "./tokenService"
const BASE_URL = "/api/profiles/"

export function friend(id) {
    return fetch(
      `${BASE_URL}/friend/${id}`,
      {
        method: 'PATCH',
        headers: { Authorization: "Bearer " + tokenService.getToken() }
      },
      { mode: "cors" }
      ).then((res) => res.json())
  }
  
  export function unfriend(id) {
    return fetch(
      `${BASE_URL}/unfriend/${id}`,
      {
        method: 'PATCH',
        headers: { Authorization: "Bearer " + tokenService.getToken() }
      },
      { mode: "cors" }
      ).then((res) => res.json())
  }

  export function getDetails(id) {
    return fetch(
      `${BASE_URL}${id}`,
      {
        method: 'GET', 
        headers: { Authorization: "Bearer " + tokenService.getToken() }

      },
      { mode: "cors" }
    )
    .then((res) => res.json())
  }