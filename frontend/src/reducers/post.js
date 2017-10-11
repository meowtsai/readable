import {
  RECEIVE_POSTS,
  SORTING_POSTS,
  ADDING_POST_OK,
  RECEIVE_POST_BY_ID,
  VOTE_POST_OK,
  DELETE_POST_OK,
  EDIT_POST_OK,
} from '../actions/post_action'

function post (state = {postsSortBy:'voteScore'}, action){
  const { posts,postsSortBy,newPost,selectedPost,deletedPost,edittedPost} = action
  switch (action.type){
    case RECEIVE_POSTS:
      return {
        ...state,
        posts,
      }
    case SORTING_POSTS:
      return {
        ...state,
        postsSortBy,
      }
    case ADDING_POST_OK:
        return {
          ...state,
          posts:state.posts.concat([newPost]),
        }
    case RECEIVE_POST_BY_ID:
        return {
          ...state,
          selectedPost,
        }
    case VOTE_POST_OK:
      return {
        ...state,
        posts:state.posts.filter(item => item.id !==selectedPost.id).concat([selectedPost]),
        selectedPost,
      }
    case DELETE_POST_OK:
      return {
        ...state,
        posts:state.posts.filter(item => item.id !==deletedPost.id),
        deletedPost,
      }
    case EDIT_POST_OK:
      return {
        ...state,
        posts:state.posts.filter(item => item.id !==edittedPost.id).concat([edittedPost]),
        selectedPost:edittedPost,
      }
    default:
        return state
  }
}

export default post
