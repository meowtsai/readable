import category from './category'
import post from './post'
import comment from './comment'
import { combineReducers } from 'redux'

export default combineReducers({
  post,
  category,
  comment,
})
