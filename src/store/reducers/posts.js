import * as actionTypes from '../../components/constants/actionTypes';
import { updateObject } from '../utility';

const addPost = (state, action) => {
  let oldPosts = [
    ...state.posts
  ]
  oldPosts.push({
    id: Math.trunc((Math.random() * 1000) + 101),
    userId: action.postObj.userId,
    title: action.postObj.title,
    body: action.postObj.body
  })
  return updateObject(state, {
    posts: oldPosts
  });
}
const updatePost = (state, action) => {
  let prevPosts = [...state.posts];
  let newPosts = prevPosts.map(val => {
    if (val.id === action.postObj.id) {
      val = action.postObj;
    }
    return val;
  });
  return updateObject(state, {
    posts: newPosts
  });
}
const deletePost = (state, action) => {
  let posts = [...state.posts];
  posts = posts.filter(val => {
    return val.id != action.postId;
  });
  return updateObject(state, {
    posts: posts
  });
}
const fetchPostsSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts
  });
};

const initPosts = {
  posts: []
};
const posts = (state = initPosts, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return addPost(state, action);
    case actionTypes.UPDATE_POST:
      return updatePost(state, action);
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    default:
      return state
  }
}

export default posts
