export const SORTING_POST="SORTING_POST"
export const GET_CATEGORIES="GET_CATEGORIES"
export const GET_POSTS="GET_POSTS"
export const GET_SINGLE_POST="GET_SINGLE_POST"
export const GET_COMMENTS="GET_COMMENTS"
export const CHANGE_CATEGORY="CHANGE_CATEGORY"


export function sortinPost({postsSortBy}){
  return {
  type: SORTING_POST,
  postsSortBy,
  }
}


export function getCategories({categories}){
  return {
  type: GET_CATEGORIES,
  categories,
  }
}


export function getPosts({posts,category}){
  return {
  type: GET_POSTS,
  posts,
  category,
  }
}


export function getSinglePost({singlepost}){
  return {
  type: GET_SINGLE_POST,
  singlepost,
  }
}

export function getComments({comments}){
  return {
  type: GET_COMMENTS,
  comments,
  }
}

export function ChangeCategory({category}){
  return {
  type: CHANGE_CATEGORY,
  category,
  }
}
