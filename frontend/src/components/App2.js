import React, { Component } from 'react';
import * as ForumAPIUtil from '../utils/server_api';

class App extends Component {


  deletePost = (postId) => (
   ForumAPIUtil
       .deletePost(postId)
       .then(deletedPost => {
         console.log("deletedPost",deletedPost)}
       )
 );


  render() {
    this.deletePost("8xf0y6ziyjabvozdd253nd")

    return (
      <div>hello</div>
    )
}}


export default  App
