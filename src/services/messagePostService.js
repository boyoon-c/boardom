import * as tokenService from './tokenService'
const BASE_URL="/api/messagePost/"

export function createMessagePost (message) {
  return fetch(
    `${BASE_URL}`,
    // `/api/messagePost`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(message)
    },
    { mode: "cors" })
  .then((res) => res.json())
}

export function getAllMessages () {
  return fetch(BASE_URL,
  {
    method: 'GET',
    headers: { Authorization: "Bearer " + tokenService.getToken()}
  }, 
  {mode: 'cors'})
  .then(res => res.json())
}