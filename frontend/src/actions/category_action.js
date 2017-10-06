import * as ForumAPIUtil from '../utils/server_api';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  ForumAPIUtil
      .fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);
