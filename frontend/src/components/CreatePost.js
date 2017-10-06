import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import serializeForm from 'form-serialize'
import  uuidv1 from 'uuid/v1'
import Header from './Header'

class CreatePost extends Component {

  handleSubmit=(e)=>{
    e.preventDefault()
    const values = serializeForm(e.target,{hash:true})

    let postValues = {
      id:uuidv1(),
      timestamp:Date.now(),
      title:values.inputTitle,
      body:values.inputPostBody,
      author:values.inputNickname,
      category:values.selectCategory,
    }

    //console.log('postValues',postValues)
    if (this.props.onCreatePost)
  	    this.props.onCreatePost(postValues)
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
    const headingText ="Fantasitic Forum > Create a Post"
    const {category_list} = this.props




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

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputNickname">Nick Name</label>
          <input type="text" className="form-control" name="inputNickname" placeholder="Nick Name" />
        </div>
        <div className="form-group">
          <label htmlFor="selectCategory">Category</label>
          <select className="form-control" name="selectCategory">
          {category_list && category_list.map((item) =>

            (
              <option key={item.path}>{item.name}</option>
            )

          )}

          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inputTitle">Title</label>
          <input type="text" className="form-control" name="inputTitle" placeholder="Enter the title of your post." />
        </div>
        <div className="form-group">
          <label htmlFor="inputPostBody">Content</label>

           <textarea name="inputPostBody" className="form-control" rows="3" placeholder="Enter the content of your post."></textarea>

        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>

      </div>
    )}

}



export default CreatePost
