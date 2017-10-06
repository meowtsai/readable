

import {
  RECEIVE_CATEGORIES,
} from '../actions/category_action'

import {
  RECEIVE_COMMENTS,
  VOTE_COMMENT_OK,
  ADDING_COMMENT_OK,
  DELETE_COMMENT_OK,
  EDIT_COMMENT_OK,
} from '../actions/comment_action'

import {
  RECEIVE_POSTS,
  SORTING_POSTS,
  ADDING_POST_OK,
  RECEIVE_POST_BY_ID,
  VOTE_POST_OK,
  DELETE_POST_OK,
} from '../actions/post_action'



import { combineReducers } from 'redux'


function category (state = {}, action){
  const { categories} = action
  switch (action.type){
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories,
      }
    default:
        return state
  }

}

function comment (state = {}, action){
  const { comments,comment,newComment,deletedComment} = action
  switch (action.type){
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments,
      }
    case VOTE_COMMENT_OK:
      return {
        ...state,
        comments:state.comments.filter(item => item.id !==comment.id).concat([comment]),
      }
    case ADDING_COMMENT_OK:
      return {
        ...state,
        comments:state.comments.concat([newComment]),
      }
    case DELETE_COMMENT_OK:
      return {
        ...state,
        comments:state.comments.filter(item => item.id !==deletedComment.id),
      }
    case EDIT_COMMENT_OK:
      return {
        ...state,
        comments:state.comments.filter(item => item.id !==comment.id).concat([comment]),
      }
    default:
        return state
  }

}



function post (state = {postsSortBy:'voteScore'}, action){
  const { posts,postsSortBy,newPost,selectedPost,deletedPost} = action
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
    default:
        return state
  }

}




export default combineReducers({
  post,
  category,
  comment,
})
