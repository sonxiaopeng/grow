import axios from 'axios'
import { baseURL } from '../config.js'

function getKnowledge(kid) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/knowledge/${kid}`).then(result => {
      if (result.data.code == 0) {
        resolve(0)
      } else if (result.data.code == 1) {
        resolve(result.data.data[0])
      }
    })
  })
}

export {getKnowledge }