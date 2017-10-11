import {
  RECEIVE_CATEGORIES,
} from '../actions/category_action'

function category (state = {}, action){
  const { categories} = action
  switch (action.type){
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories,
      }
    default:
        return state
  }

}

export default category
