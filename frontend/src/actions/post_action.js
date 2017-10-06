import * as ForumAPIUtil from '../utils/server_api';

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const SORTING_POSTS = "SORTING_POSTS"
export const ADDING_POST_OK = "ADDING_POST_OK"
export const RECEIVE_POST_BY_ID = "RECEIVE_POST_BY_ID"
export const VOTE_POST_OK = "VOTE_POST_OK"
export const DELETE_POST_OK = "DELETE_POST_OK"
export const EDIT_POST_OK = "EDIT_POST_OK"




export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  ForumAPIUtil
      .fetchPosts()
      .then(posts => dispatch(receivePosts(posts)))
);



export const fetchPostsByCategory = (category) => dispatch => (
  ForumAPIUtil
      .fetchPosts(category)
      .then(posts => dispatch(receivePosts(posts)))
);


export const sortinPost = postsSortBy => ({
  type: SORTING_POSTS,
  postsSortBy
});

export const addingPostOK = newPost => ({
  type: ADDING_POST_OK,
  newPost
});


export const addingPost = (submittedValue) => dispatch => (
  ForumAPIUtil
      .addNewPost(submittedValue)
      .then(newPost => dispatch(addingPostOK(newPost)))
);


export const receivePostById = selectedPost => ({
  type: RECEIVE_POST_BY_ID,
  selectedPost
});

export const fetchPostById = (postid) => dispatch => (
  ForumAPIUtil
      .fetchPostById(postid)
      .then(
        post =>{
        dispatch(receivePostById(post))
      })
      .catch(() => console.log("fetchPostById", "error")));


export const votePost = (info) => dispatch => (
  ForumAPIUtil
      .votePost(info)
      .then(post => dispatch(votePostOK(post)))
);


export const votePostOK = selectedPost => ({
  type: VOTE_POST_OK,
  selectedPost
});


export const deletePostOK = deletedPost => ({
  type: DELETE_POST_OK,
  deletedPost
});

export const deletePost = (postId) => dispatch => (
  ForumAPIUtil
      .deletePost(postId)
      .then(deletedPost => dispatch(deletePostOK(deletedPost)))
);



export const editPostOK = edittedPost => ({
  type: EDIT_POST_OK,
  edittedPost
});


export const editPost = (submittedValue) => dispatch => (
  ForumAPIUtil
      .editPost(submittedValue)
      .then(edittedPost => dispatch(editPostOK(edittedPost)))
);
