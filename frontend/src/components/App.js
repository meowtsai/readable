import React, { Component } from 'react';
import PostsMain from './PostsMain'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import Detail from './Detail'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../actions/category_action';
import * as postActions from '../actions/post_action';
import { Route,withRouter} from 'react-router-dom'


class App extends Component {
  componentDidMount = () =>{
    //console.log('componentDidMount',this.props)
    if (!this.props.categories) {
      this.props.actions.fetchCategories();
    }
  }

  createPost(post){
    this.props.actions.addingPost(post);
  }

  render() {
    const {categories} =  this.props;
    //categories,sortByOption,posts,onChangeCategory

    return (
      <div className="container">
      <Route exact path="/" render={() => (
          <PostsMain
            categories={categories}
          />
      )}/>

      <Route exact path="/:category" render={() => (
          <PostsMain
            categories={categories}
          />
      )}/>



        <Route exact path="/create/a/post" render={({history}) =>(
          <CreatePost
            category_list={categories}
            onCreatePost={(post)=>{
              this.createPost(post)
              history.push('/')
            }}
          />
        )}/>


        <Route exact path='/:category/:postid' render={(props) => (
          <Detail {...props} />
        )}/>

        <Route exact path='/:category/:postid/Edit' render={(props) => (
          <EditPost {...props} />
        )}/>
      </div>


    )
  }
}




function mapStateToProps({ post,category }) {
  return {
    categories: category.categories,
    posts:post.posts
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(categoryActions,postActions), dispatch)}
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
