import * as tokenService from './tokenService'
const BASE_URL="/api/group/"

export function createGroup (group) {
  return fetch(
    `${BASE_URL}createGroup`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(group)
    },
    { mode: "cors" })
  .then((res) => res.json())
}

export function getGroupProfile() {
  return fetch(`${BASE_URL}groupProfile`, 
  {headers: { Authorization: "Bearer " + tokenService.getToken() }},
  {mode: 'cors'})
  .then(res => res.json())
}

export function join(id) {
  return fetch(
    `${BASE_URL}/join/${id}`,
    {
      method: 'PATCH',
      headers: { Authorization: "Bearer " + tokenService.getToken() }
    },
    { mode: "cors" }
    ).then((res) => res.json())
}

export function leave(id) {
  return fetch(
    `${BASE_URL}/leave/${id}`,
    {
      method: 'PATCH',
      headers: { Authorization: "Bearer " + tokenService.getToken() }
    },
    { mode: "cors" }
    ).then((res) => res.json())
}

export function getAllGroups() {
  return fetch(BASE_URL,
  {
    method: 'GET',
    headers: { Authorization: "Bearer " + tokenService.getToken()}}, 
  {mode: 'cors'})
  .then(res => res.json())
}