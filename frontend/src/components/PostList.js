import React,{ Component } from 'react'
import PostListItem from './PostListItem'


class PostList extends Component {
  render(){
  const {list} = this.props
  return (
    <div className="row">
					<div className="col-sm-12">
            <div className="well">
            <table className="table table-striped table-forum">
              <thead>
                <tr>
        					<th className="text-center hidden-xs hidden-sm">Title</th>
                  <th className="text-center hidden-xs hidden-sm">Vote Score</th>
                  <th className="text-center hidden-xs hidden-sm">Author</th>
                  <th className="text-center hidden-xs hidden-sm">Comments</th>
                  <th className="text-center hidden-xs hidden-sm">Action</th>
                </tr>
              </thead>

              {list.map((item) => (
        					<PostListItem key={item.id} item={item} />

              ))}

            </table>
            </div>
        </div>
      </div>



  )
}}



export default PostList



//{"id":"6ni6ok3ym7mf1p33lnez","timestamp":1468479767190,"title":"Learn Redux in 10 minutes!","body":"Just kidding. It takes more than 10 minutes to learn technology.","author":"thingone","category":"redux","voteScore":-5,"deleted":false}]
