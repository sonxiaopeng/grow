import axios from 'axios'
import { baseURL } from '../config.js'
function getCount() {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + "/count").then(result => {
      resolve(result.data)
    })
  })
};

function getArticle(page) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/article/${page}`).then(result => {
      resolve(result.data.data)
    })
  })
};

function getSearch(qw) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/search/${qw}`).then(result => {
      if (result.data.code == 0) {
        resolve(0)
      } else if (result.data.code == 1) {
        resolve(result.data.data)
      }
    })
  })
}

function getAll() {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/knowledgeall`).then(result => {
      if (result.data.code == 0) {
        reject({ "data": 0 })
      } else if (result.data.code == 1) {
        resolve(result.data.data)
      }
    })
  })
}
export { getCount, getArticle, getSearch ,getAll}