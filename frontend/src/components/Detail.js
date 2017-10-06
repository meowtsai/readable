import React, { Component } from 'react';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import { Link } from 'react-router-dom'
import PostContent from './PostContent'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './Header'
import * as postActions from '../actions/post_action';
import Modal from 'react-modal'
import CommentList from './CommentList'




class Detail extends Component {
  state = {
      modalIsOpen: false,
      confirmModalIsOpen: false,
      typeToBeDeleted:null,
      idToBeDeleted:null,

    }

    componentDidMount = () =>{
      //console.log('componentDidMount',this.props)
      const postid = this.props.match.params.postid
      if (!this.props.selectedPost || this.props.selectedPost.id !== postid) {
        this.props.actions.fetchPostById(postid);
      }

    }


  votePost(info){
    //console.log("votePost",info)
    this.props.actions.votePost(info);
  }

  goToEditPage(id){
    //alert('hi' + id)
    const {category} =this.props.selectedPost
    //console.log(category  , id)
    this.props.history.push(`/${category}/${id}/Edit`);
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

  render() {
    const headingText ="Fantasitic Forum > Post Detail"
    const postid = this.props.match.params.postid
    const { selectedPost } = this.props
    //console.log("this.props",this.props)
    return (
      <div className="container">
        <Header title={headingText}/>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand" ><FaArrowLeft />Back</Link>
            </div>
          </div>
        </nav>

        {selectedPost && selectedPost.error &&
          <div>
            {selectedPost.error}

            <button onClick={(e)=>this.props.history.push('/')}>
              Back
            </button>
          </div>
        }





        {selectedPost && !selectedPost.error && selectedPost.id === postid &&
        <div>
          <PostContent post_content={selectedPost}
            onVotePost={(info)=>{
              this.votePost(info)
          }}
            onDelete ={(id)=>{
              this.openConfirmModal({id,type:'post'})
            }}

            onEdit ={(id)=>{this.goToEditPage(id)}}


          />

          <CommentList postid={selectedPost.id} />
        </div>
      }

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

    );
  }
}



function mapStateToProps({ post },ownProps) {
  //const postid = ownProps.match.params.postid
  //console.log("post",post.posts)
  return {
    selectedPost:post.selectedPost,
    //selectedPost:post.posts.filter((aPost) => aPost.id===postid),
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(postActions), dispatch)}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
