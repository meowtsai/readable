import React, { Component } from 'react';
import { timeConverter } from '../utils/helper'
import FaComment from 'react-icons/lib/fa/comment'
import FaHeart from 'react-icons/lib/fa/heart'
import VoteSection from './VoteSection'
import * as commentActions from '../actions/comment_action'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sortBy from 'sort-by'
import Modal from 'react-modal'

import CreateComment from './CreateComment'
import EditComment from './EditComment'
import FaPencil from 'react-icons/lib/fa/pencil'
import serializeForm from 'form-serialize'
import  uuidv1 from 'uuid/v1'

class CommentList extends Component {
  state = {
    modalIsOpen: false,
    confirmModalIsOpen: false,
    typeToBeDeleted:null,
    idToBeDeleted:null,
    editModalIsOpen: false,
    idToBeEdited:null,


    }

  componentDidMount = () =>{
    //console.log('CommentListV2 componentDidMount',this.props)

    if (this.props.selectedPost !== this.props.postid) {
      this.props.actions.fetchCommentsByPostId(this.props.selectedPost.id);
    }

  }
  voteComment(info){
    //894tuq4ut84ut8v4t8wun89g
    //console.log("VoteComment",info)
    this.props.actions.voteComment(info);
  }


  deleteAction(){
    //894tuq4ut84ut8v4t8wun89g
    //console.log("VoteComment",info)
    //openConfirmModal(id)
    const {idToBeDeleted,typeToBeDeleted } =this.state

    if (typeToBeDeleted==='comment')
    {
        this.props.actions.deleteComment(idToBeDeleted);
    }
    else if (typeToBeDeleted==='post'){
      this.props.actions.deletePost(idToBeDeleted);
      this.props.history.push('/');
    }



    this.closeConfirmModal()
  }


  openConfirmModal = (info) =>
  {
    const typeToBeDeleted = info.type
    const idToBeDeleted = info.id

    this.setState(() => ({ confirmModalIsOpen: true ,idToBeDeleted,typeToBeDeleted}))
  }
  closeConfirmModal = () => this.setState(() => ({ confirmModalIsOpen: false, idToBeDeleted: null, typeToBeDeleted:null, }))

    onEdit = () => {

    }

    CreateComment(e){

      e.preventDefault()
      const values = serializeForm(e.target,{hash:true})

      const comment_body = {
        id:uuidv1(),
        timestamp:Date.now(),
        body:values.inputPostBody,
        author:values.inputNickname,
        parentId:this.props.selectedPost.id,
      }
      this.props.actions.addingComment(comment_body);
      }

      openModal = () => {
        this.setState({modalIsOpen: true});
      }

      closeModal = () => {
        this.setState({modalIsOpen: false});
      }

      handleModalCloseRequest = () => {
        this.setState({modalIsOpen: false});
      }


      openEditModal = (idToBeEdited) => {

        this.setState({editModalIsOpen: true,idToBeEdited});

        console.log("openEditModal",idToBeEdited)
      }

      closeEditModal = () => {
        this.setState({editModalIsOpen: false});
      }

      handleEditModalCloseRequest = () => {
        this.setState({editModalIsOpen: false});
      }

      EditComment(e){

        e.preventDefault()
        const values = serializeForm(e.target,{hash:true})

        const comment_body = {
          id:this.state.idToBeEdited,
          timestamp:Date.now(),
          body:values.inputPostBody,
        }
        //console.log("EditComment",comment_body)
        this.props.actions.editComment(comment_body);
        }


    render() {
      const {selectedPost,comments,postid} = this.props

      let CommentsDisplayed=comments
      CommentsDisplayed && CommentsDisplayed.sort(sortBy('voteScore')).reverse()

      return (
        <div>

        {postid ===selectedPost.id && comments &&
          <div>
            <div>
              <h5 className="text-primary">{CommentsDisplayed.length} Comments <FaComment /></h5>
            </div>
            <hr />
            {CommentsDisplayed.map((item) => (

              <div className="comment col-md-8" key={item.id}>
                <div className="row">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      by {item.author}
                    </li>
                    <li className="list-inline-item g-mx-10">/</li>
                    <li className="list-inline-item">
                     {timeConverter(item.timestamp)}
                    </li>
                    <li className="list-inline-item">/</li>
                    <li className="list-inline-item">
                       <FaHeart /> {item.voteScore}

                    </li>

                  </ul>

                  <div>{item.body} </div>

                </div>
                <hr />

                <VoteSection id={item.id}
                  onVote={(info)=>{
                    this.voteComment(info)
                  }}
                  onDelete ={(id)=>{
                    this.openConfirmModal({id,type:'comment'})
                  }}


                  onEdit ={(id)=>{
                    this.openEditModal(id)
                  }}

                />


              </div>
            ))}


            <Modal
              className="Modal__Bootstrap modal-dialog"
              closeTimeoutMS={150}
              isOpen={this.state.editModalIsOpen}
              onRequestClose={this.handleEditModalCloseRequest}
              contentLabel="Modal"
            >

            <EditComment
              comment={CommentsDisplayed.filter((comment)=>comment.id===this.state.idToBeEdited)[0]}
              handleModalCloseRequest={()=>this.handleEditModalCloseRequest()}
              handleCommentSubmit={(e)=>{
                this.EditComment(e)
                this.handleEditModalCloseRequest()
              }}

            />

            </Modal>
            </div>


          }

          <div className=" col-md-8">
             <button className="btn-primary" onClick={this.openModal}><FaPencil />  Write a comment</button>
             <Modal
               className="Modal__Bootstrap modal-dialog"
               closeTimeoutMS={150}
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.handleModalCloseRequest}
               contentLabel="Modal"
             >

             <CreateComment
               handleModalCloseRequest={()=>this.handleModalCloseRequest()}
               handleCommentSubmit={(e)=>{
                 this.CreateComment(e)
                 this.handleModalCloseRequest()
               }}

             />

             </Modal>
           </div>

          <Modal
            className="Modal__Bootstrap modal-dialog"
            closeTimeoutMS={150}
            isOpen={this.state.confirmModalIsOpen}
            onRequestClose={this.closeConfirmModal}
            contentLabel="Confirm"
          >

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.closeConfirmModal}>
                  <span aria-hidden="true">&times;</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title">Confirm</h4>
              </div>
              <div className="modal-body">
                  <div className="form-group">
                    <label >Are you sure you want to delete it?</label>
                  </div>


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.closeConfirmModal}>No</button>
                <button type="button" className="btn btn-danger" onClick={(e)=>this.deleteAction(e)}>Delete it!</button>
              </div>
            </div>

          </Modal>




          </div>


        )}

  }



  function mapStateToProps({ post,comment}) {
    //console.log("CommentList mapStateToProps",comment.comments)
    return {
      selectedPost:post.selectedPost,
      comments:comment.comments,
    }
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(Object.assign(commentActions), dispatch)}
  }


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentList)





//{"id":"6ni6ok3ym7mf1p33lnez","timestamp":1468479767190,"title":"Learn Redux in 10 minutes!","body":"Just kidding. It takes more than 10 minutes to learn technology.","author":"thingone","category":"redux","voteScore":-5,"deleted":false}]
