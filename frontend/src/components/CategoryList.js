import React from 'react'
import { Link} from 'react-router-dom'

export default function CategoryList ({ list, onSelect }) {
  return (

          <ul className="nav navbar-nav">
              <li key='' ><Link to="/" onClick={(e) => onSelect(null)} >all</Link></li>
              {list.map((item) => (
                  <li key={item.name} ><Link to={`/${item.path}`} onClick={(e) => onSelect(item.path)} >{item.name}</Link></li>

              ))}
          </ul>


  )
}
