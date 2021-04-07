import * as actionTypes from '../../components/constants/actionTypes';
import axiosInstance from '../../axios.config';

export const addPost = (postObj, postId) => ({
  type: actionTypes.ADD_POST,
  postObj: postObj
});
export const getPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart());
    axiosInstance.get(axiosInstance.defaults.baseUrl + "/posts")
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchPostsFail(err));
      });
  };
};
export const updatePost = (postObj) => {
  return {
    type: actionTypes.UPDATE_POST,
    postObj: postObj
  }
};
export const deletePost = (postId) => {
  return {
    type: actionTypes.DELETE_POST,
    postId: postId
  }
};
export const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts
  };
};

export const fetchPostsFail = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error
  };
};

