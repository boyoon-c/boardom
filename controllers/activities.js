import { Activity } from '../models/activity.js'
import axios from 'axios'

export {
  search
}

function search (req, res) {
  axios.get(`https://www.boredapi.com/api/activity/?participants=${req.params.participants}&type=${req.params.type}`)
  .then(response => {
    res.json(response.data)
  })
}