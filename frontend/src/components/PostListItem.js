import React,{ Component } from 'react'
import { timeConverter } from '../utils/helper'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as postActions from '../actions/post_action';
import * as commentActions from '../actions/comment_action';
import VoteSection from './VoteSection'
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal'


class PostListItem extends Component {
  state = {
      confirmModalIsOpen: false,
      typeToBeDeleted:null,
      idToBeDeleted:null,

    }

  componentDidMount = () =>{
    // /console.log('PostListItem componentDidMount',this.props)
    if (this.props.item) {
      this.props.actions.fetchCommentsByPostId(this.props.item.id);
    }
  }

  votePost(info){
    //console.log("votePost",info)
    this.props.actions.votePost(info);
  }

  goToEditPage(id){
    //alert('hi' + id)
    const {category} =this.props.item
    //console.log(category  , id)
    this.props.actions.receivePostById(this.props.item)
    this.props.history.push(`/${category}/${id}/Edit`);
  }

  deleteAction(){
    const {idToBeDeleted,typeToBeDeleted } =this.state
    //console.log("deleteAction",idToBeDeleted,typeToBeDeleted)
    if (typeToBeDeleted==='post'){
      this.props.actions.deletePost(idToBeDeleted);
    //  this.props.history.push('/');
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

  render(){
  const {item,comments,post_comments_count} = this.props
  //console.log('PostListItem post_comments_count',post_comments_count)
  return (
    <tbody>
      { comments &&
        <tr key={item.id}>
          <td>
            [{item.category}]<Link to={`/${item.category}/${item.id}`}>{item.title}</Link>
  				</td>
  				<td className="text-center hidden-xs hidden-sm">
            {item.voteScore}
					</td>
          <td className="hidden-xs hidden-sm">by &nbsp;
						<a >{item.author}</a>
						<br />
						<small><i>{timeConverter(item.timestamp)}</i></small>
					</td>
          <td className="text-center hidden-xs hidden-sm">

          {post_comments_count &&
            <div>{post_comments_count.count}</div>

          }
          </td>
          <td className="text-center hidden-xs hidden-sm">


            <VoteSection id={item.id}
              onVote={(info)=>{
                this.votePost(info)
              }}
              onDelete ={(id)=>{
                this.openConfirmModal({id,type:'post'})
              }}
              onEdit ={(id)=>{
                this.goToEditPage(id)
              }}

            />

					</td>
				</tr>
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

          </tbody>

  )
}}

function mapStateToProps({ post,comment },ownProps) {
  return {
    comments:comment.comments,
    post_comments_count:comment.post_comments_count.filter((pcc) => pcc.ParentPostId === ownProps.item.id)[0],
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(postActions,commentActions), dispatch)}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostListItem))


//http://localhost:3000/redux/6ni6ok3ym7mf1p33lnez/Edit
//http://localhost:3000/udacity/bf9832b0-ae32-11e7-82f4-ef3ca23e32e0/Edit
//{"id":"6ni6ok3ym7mf1p33lnez","timestamp":1468479767190,"title":"Learn Redux in 10 minutes!","body":"Just kidding. It takes more than 10 minutes to learn technology.","author":"thingone","category":"redux","voteScore":-5,"deleted":false}]
