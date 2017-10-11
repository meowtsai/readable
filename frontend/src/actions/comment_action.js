import * as ForumAPIUtil from '../utils/server_api';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const VOTE_COMMENT_OK = "VOTE_COMMENT_OK"
export const ADDING_COMMENT_OK = "ADDING_COMMENT_OK"
export const DELETE_COMMENT_OK = "DELETE_COMMENT_OK"
export const EDIT_COMMENT_OK = "EDIT_COMMENT_OK"



export const receiveComments = (comments,PostId) => ({
  type: RECEIVE_COMMENTS,
  comments,
  post_comments_count:{ParentPostId:PostId,count:(comments?comments.length:0)},
});

export const fetchCommentsByPostId = (PostId) => dispatch => (
  ForumAPIUtil
      .fetchCommentListByPostId(PostId)
      .then(comments => dispatch(receiveComments(comments,PostId)))
);


export const voteCommentOK = comment => ({
  type: VOTE_COMMENT_OK,
  comment
});

export const voteComment = (info) => dispatch => (
  ForumAPIUtil
      .voteComment(info)
      .then(comment => dispatch(voteCommentOK(comment)))
);


export const addingCommentOK = newComment => ({
  type: ADDING_COMMENT_OK,
  newComment
});


export const addingComment = (submittedValue) => dispatch => (
  ForumAPIUtil
      .addNewComment(submittedValue)
      .then(newComment => dispatch(addingCommentOK(newComment)))
);

export const deleteCommentOK = deletedComment => ({
  type: DELETE_COMMENT_OK,
  deletedComment
});

export const deleteComment = (commentId) => dispatch => (
  ForumAPIUtil
      .deleteComment(commentId)
      .then(deletedComment => dispatch(deleteCommentOK(deletedComment)))
);

export const editCommentOK = comment => ({
  type: EDIT_COMMENT_OK,
  comment
});

export const editComment = (submittedValue) => dispatch => (
  ForumAPIUtil
      .editComment(submittedValue)
      .then(comment => dispatch(editCommentOK(comment)))
);
