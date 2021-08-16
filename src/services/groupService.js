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