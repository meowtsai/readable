import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'
import Header from './Header'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../actions/post_action';
import { withRouter} from 'react-router-dom'



class EditPost extends Component {

  handleSubmit=(e)=>{
    e.preventDefault()
    const values = serializeForm(e.target,{hash:true})

    const {id,category} =this.props.selectedPost

    let postValues = {
      id,
      //timestamp:Date.now(),
      title:values.inputTitle,
      body:values.inputPostBody,
    }

    console.log('this.props.actions',this.props.actions)
    if (this.props.actions.editPost)
  	    this.props.actions.editPost(postValues)

    this.props.history.push(`/${category}/${id}`);
    /*

    PARAMS:
      id - UUID should be fine, but any unique id will work
      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
      title - String
      body - String
      author - String
      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
    */
    //if (this.props.onCreateContact)
    //this.props.onCreateContact(values)
    }

  render() {
    const headingText ="Fantasitic Forum > Edit a Post"
    const {selectedPost} = this.props




    return (
      <div>
        <Header title={headingText}/>

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" ><FaArrowLeft />Back</Link>
          </div>
        </div>
      </nav>

      {selectedPost &&

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputNickname">Nick Name</label>
          {': '}
          {selectedPost.author}
        </div>
        <div className="form-group">
          <label htmlFor="selectCategory">Category</label>
          {': '}
          {selectedPost.category}
        </div>
        <div className="form-group">
          <label htmlFor="inputTitle">Title</label>
          <input type="text" className="form-control" name="inputTitle" placeholder="Enter the title of your post." defaultValue={selectedPost.title}/>
        </div>
        <div className="form-group">
          <label htmlFor="inputPostBody">Content</label>

           <textarea name="inputPostBody" className="form-control" rows="3" placeholder="Enter the content of your post." defaultValue={selectedPost.body}></textarea>

        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    }
      </div>
    )}

}



function mapStateToProps({ post}) {
  return {
    selectedPost:post.selectedPost,
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(postActions), dispatch)}
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost))
