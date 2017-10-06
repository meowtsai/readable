import React from 'react';



export default function CreateComment ({ parentId,handleCommentSubmit,handleModalCloseRequest,handleSaveClicked }) {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={handleModalCloseRequest}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title">Write your comment</h4>
        </div>
        <form onSubmit={(e)=>handleCommentSubmit(e)}>
        <div className="modal-body">


            <div className="form-group">
              <label htmlFor="inputNickname">Nick Name</label>
              <input type="text" className="form-control" name="inputNickname" placeholder="Nick Name" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPostBody">Content</label>

               <textarea name="inputPostBody" className="form-control" rows="3" placeholder="Enter the content of your post."></textarea>

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
