import React from 'react'
import { timeConverter } from '../utils/helper'
import { Link } from 'react-router-dom'

export default function PostList ({ list }) {
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
                </tr>
              </thead>
        			<tbody>
              {list.map((item) => (
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
        					</tr>

              ))}
              </tbody>
            </table>
            </div>
        </div>
      </div>



  )
}

//{"id":"6ni6ok3ym7mf1p33lnez","timestamp":1468479767190,"title":"Learn Redux in 10 minutes!","body":"Just kidding. It takes more than 10 minutes to learn technology.","author":"thingone","category":"redux","voteScore":-5,"deleted":false}]
