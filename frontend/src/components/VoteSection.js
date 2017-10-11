import React from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'

export default function VoteSection ({id,onVote,onDelete,onEdit }) {
  return (
    <div className="row thumb_icon_row">
      <div className="col-md-1">
        <FaThumbsOUp className="action_section" size={25} onClick={(e) => onVote({id,'option':'upVote'})} />
      </div>
      <div className="col-md-1">
        <FaThumbsODown className="action_section" size={25} onClick={(e) => onVote({id,'option':'downVote'})}  />
      </div>
      <div className="col-md-1">
        <MdEdit className="action_section" size={25} onClick={(e) => onEdit(id)} />
      </div>
      <div className="col-md-1">
        <MdDelete className="action_section" size={25} onClick={(e) => onDelete(id)}  />
      </div>

    </div>
  )
}
