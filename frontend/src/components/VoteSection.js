import React from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'

export default function VoteSection ({id,onVote,onDelete,onEdit }) {
  return (
    <div className="row thumb_icon_row">
      <hr />
      <div className="col-md-1">
        <FaThumbsOUp size={25} onClick={(e) => onVote({id,'option':'upVote'})}  />
      </div>
      <div className="col-md-1">
        <FaThumbsODown  size={25} onClick={(e) => onVote({id,'option':'downVote'})}  />
      </div>
      <div className="col-md-1">
        <MdEdit  size={25} onClick={(e) => onEdit(id)} />
      </div>
      <div className="col-md-1">
        <MdDelete  size={25} onClick={(e) => onDelete(id)}  />
      </div>

    </div>
  )
}
