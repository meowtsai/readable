import React, { Component } from 'react';
import CategoryList from './CategoryList'
import PostList from './PostList'
import Header from './Header'
import FaPencil from 'react-icons/lib/fa/pencil'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../actions/post_action';

class PostsMain extends Component {

  componentDidMount = () =>{
    //console.log('componentDidMount',this.props)
    //this.props.actions.fetchCategories();
    if (!this.props.posts) {
      this.props.actions.fetchPosts()
    }
  }

  selectCategory(categoryPath) {
    //console.log('selectCategory',"triggered" +categoryPath )
    this.props.actions.fetchPostsByCategory(categoryPath);
  }

  selectSortingOption(option) {
    //console.log('selectSortingOption',"triggered" +option )
    this.props.actions.sortinPost(option);
  }

    render() {
      const headingText ="Fantasitic Forum"

      //console.log('PostsMain render',this.props)
      let {categories,postsSortBy,posts} =this.props

      //console.log('postsSortBy',postsSortBy)

      let PostsDisplayed=posts

      PostsDisplayed && PostsDisplayed.sort(sortBy(postsSortBy)).reverse()

      return (
        <div>
        <Header title={headingText}/>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {categories &&
              <CategoryList
                list={categories}
                onSelect={(category)=> {this.selectCategory(category)}}/>
            }

            <ul className="nav navbar-nav navbar-right">
             <li className="navbar-text">
             Sort By:
             <select id='selSortBy'   onChange={(e) => this.selectSortingOption(e.target.value) } >
               <option value='voteScore'> Vote Score </option>
               <option value='timestamp'> Time </option>
             </select>
             </li>
             <li><Link to="/create/a/post" className='btn btn-info'><FaPencil /> Write Your Post </Link></li>
           </ul>

         </div>
        </nav>
        {PostsDisplayed &&
          <PostList list={PostsDisplayed} />
        }
        </div>

      )

}}

function mapStateToProps({ post }) {
  return {
    //categories: category.categories,
    posts:post.posts,
    postsSortBy: post.postsSortBy,
  }
}
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(postActions), dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsMain)
