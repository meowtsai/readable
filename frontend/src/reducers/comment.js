import {
  RECEIVE_COMMENTS,
  VOTE_COMMENT_OK,
  ADDING_COMMENT_OK,
  DELETE_COMMENT_OK,
  EDIT_COMMENT_OK,
} from '../actions/comment_action'

function comment (state = {post_comments_count:[]}, action){
  const { comments,comment,newComment,deletedComment,post_comments_count} = action
  switch (action.type){
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments,
        post_comments_count:(state.post_comments_count?state.post_comments_count.filter(item => item.ParentPostId !==post_comments_count.ParentPostId).concat([post_comments_count]):post_comments_count),

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


export default comment
