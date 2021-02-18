import axios from 'axios'
import { baseURL } from '../config.js'
function getDetails(aid) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/details/${aid}`).then(result => {
      resolve(result.data.data[0])
    })
  })
}

function setComment(from_id, create_at, to_id, comment_content, user_id) {
  return new Promise((resolve, reject) => {
    axios.post(baseURL + "/setcomment", `from_id=${from_id}&create_at=${create_at}&to_id=${to_id}&comment_content=${comment_content}&user_id=${user_id}`).then(result => {
      if (result.data.code == 0) {
        null
      } else if (result.data.code == 1) {
        resolve(result.data)
      }
    })
  })
}

function getComment(article_id) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/getcomment/${article_id}`).then(result => {
      if (result.data.code == 0) {
        null
      } else if (result.data.code == 1) {
        resolve(result.data.data)
      }
    })
  })
}

function getCommentAndUser(comment_id) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/getcommentanduser/${comment_id}`).then(result => {
      if (result.data.code == 0) {
        null
      } else if (result.data.code == 1) {
        resolve(result.data.data[0])
      }
    })
  })
}

function getBabyAge(lid) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/getbabyage/${lid}`).then(result => {
      if (result.data.code == 0) {
        null
      } else if (result.data.code == 1) {
        resolve(result.data.data[0])
      }
    })
  })
}

function setGoodAdd(comment_id) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/setgoodadd/${comment_id}`).then(result => {
      if (result.data.code == 0) {
        null
      } else if (result.data.code == 1) {
        resolve(1)
      }
    })
  })
}

function setGoodDel(comment_id) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/setgooddel/${comment_id}`).then(result => {
      if (result.data.code == 0) {
        resolve(0)
      } else if (result.data.code == 1) {
        resolve(1)
      }
    })
  })
}

function setWatch(article_id) {
  return new Promise((resolve, reject) => {
    axios.get(baseURL + `/setwatch/${article_id}`).then(result => {
      if (result.data.code == 0) {
        resolve(0)
      } else if (result.data.code == 1) {
        resolve(1)
      }
    })
  })
}
export { getDetails, setComment, getComment, getCommentAndUser, getBabyAge,setGoodAdd,setGoodDel,setWatch }