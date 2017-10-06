//const api = process.env.REACT_APP_BACKEND
const api = "http://localhost:3001"
const headers = { 'Authorization': 'shihfan' }

export function fetchCategories () {
return fetch(`${api}/categories`,{ headers})
    .then((res) => res.json())
    .then(data => data.categories)
    // {"categories":[{"name":"react","path":"react"},{"name":"redux","path":"redux"},{"name":"udacity","path":"udacity"}]}
    //.then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export function fetchPosts (category=null) {
  let _url
  category ? _url=`${api}/${category}/posts` : _url=`${api}/posts`
  //console.log('server_api fetchPosts', _url)
return fetch(_url, { headers, })
    .then((res) => res.json())
    // [{"id":"8xf0y6ziyjabvozdd253nd","timestamp":1467166872634,"title":"Udacity is the best place to learn React","body":"Everyone says so after all.",
    //"author":"thingtwo","category":"react","voteScore":6,"deleted":false},
    //{"id":"6ni6ok3ym7mf1p33lnez","timestamp":1468479767190,"title":"Learn Redux in 10 minutes!","body":"Just kidding. It takes more than 10 minutes to learn technology.","author":"thingone","category":"redux","voteScore":-5,"deleted":false}]
}


export function fetchPostById (id) {
  if (id===null)
  return

  let _url=`${api}/posts/${id}`
  //console.log('server_api fetchPostById', _url)
  return fetch(_url, { headers , })
    .then((res) => res.json())
}


export function fetchCommentListByPostId (id) {
  if (id===null)
  return
  //GET /posts/:id/comments
  let _url=`${api}/posts/${id}/comments`
  return fetch(_url, { headers , })
    .then((res) => res.json())
}

export const addNewPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())


export const votePost = (info) =>
  fetch(`${api}/posts/${info.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:info.option})
  }).then(res => res.json())

export const voteComment = (info) =>
  fetch(`${api}/comments/${info.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:info.option})
  }).then(res => res.json())


  export const addNewComment = (comment_body) =>
    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment_body)
    }).then(res => res.json())

export const deleteComment = (comment_id) =>
  fetch(`${api}/comments/${comment_id}`, {
    method: 'DELETE',
    headers,}).then(res => res.json())

export const deletePost = (post_id) =>
  fetch(`${api}/posts/${post_id}`, {
    method: 'DELETE',
    headers,}).then(res => res.json())

export const editComment3 = (comment_body) =>
  fetch(`${api}/comments/${comment_body.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment_body),
  }).then(res => res.json())

  export const editComment = (body) =>
    fetch(`${api}/comments/${body.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())



  export const editPost = (body) =>
    fetch(`${api}/posts/${body.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
