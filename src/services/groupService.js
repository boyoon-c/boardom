import * as tokenService from './tokenService'
const BASE_URL="/api/group/"

export function addActivity(activity, groupId){
  return fetch(
    `${BASE_URL}addActivity/${groupId}`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
      body: JSON.stringify(activity)
    },
    { mode: "cors" })
  .then((res) => res.json())
}


export function createGroup(group) {
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

export function getGroupProfile(id) {
  return fetch(`${BASE_URL}${id}`, 
  {headers: { Authorization: "Bearer " + tokenService.getToken() }},
  {mode: 'cors'})
  .then(res => res.json())
}

export function join(id) {
  return fetch(
    `${BASE_URL}join/${id}`,
    {
      method: 'PATCH',
      headers: { Authorization: "Bearer " + tokenService.getToken() }
    },
    { mode: "cors" }
    ).then((res) => res.json())
}

export function leave(id) {
  return fetch(
    `${BASE_URL}leaveGroup/${id}`,
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

export function joinGroupActivity(groupId, activityNo) {
  return fetch(`${BASE_URL}joinActivity/${groupId}`,
    {
      method: 'POST',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},    
      body: JSON.stringify({key: activityNo})
    },
    {mode: 'cors'}
    )
    .then(res => res.json())
}