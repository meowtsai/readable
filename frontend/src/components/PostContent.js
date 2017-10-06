import React from 'react'
import { timeConverter } from '../utils/helper'
import FaHeart from 'react-icons/lib/fa/heart'
import VoteSection from './VoteSection'


export default function PostContent ({ post_content,onVotePost,onDelete,onEdit }) {
  return (
      <div>


          {post_content &&
            <article>
              <header>
               <h2 >{post_content.title}</h2>

               <ul className="list-inline">
                 <li className="list-inline-item">
                   by {post_content.author}
                 </li>
                 <li className="list-inline-item g-mx-10">/</li>
                 <li className="list-inline-item">
                  {timeConverter(post_content.timestamp)}
                 </li>
                 <li className="list-inline-item">/</li>
                 <li className="list-inline-item">
                    <FaHeart /> {post_content.voteScore}

                 </li>

               </ul>

               </header>



              <div className="well">



              {post_content.body}

              <VoteSection id={post_content.id} onVote={onVotePost} onDelete={onDelete} onEdit={onEdit} />
              </div>



            </article>
          }
      </div>
  )
}
