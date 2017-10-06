import React from 'react';



export default function EditComment ({ comment,handleCommentSubmit,handleModalCloseRequest }) {
  //console.log('EditComment',comment)
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={handleModalCloseRequest}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title">Edit your comment</h4>
        </div>
        <form onSubmit={(e)=>handleCommentSubmit(e)}>
        <div className="modal-body">


            <div className="form-group">
              <label>Nick Name: </label>
              <label>{comment.author}</label>
              <input type="hidden" defaultValue={comment.id} name="inputCommentId" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPostBody">Content</label>
               <textarea name="inputPostBody" className="form-control" rows="3" placeholder="Enter the content of your post." defaultValue={comment.body}></textarea>

            </div>


        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={handleModalCloseRequest}>Close</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
      </div>
    )
}
