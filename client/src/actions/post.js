import axios from "axios";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_SINGLEPOST,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "./actionTypes";
import { setAlert } from "./alert";
const baseUrl = "http://localhost:5000";

//get all posts
export const getPosts = () => async (dispatch) => {
  try {
    let res = await axios.get(`${baseUrl}/api/posts`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get a single posts
export const getSinglePost = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`${baseUrl}/api/posts/${id}`);
    dispatch({
      type: GET_SINGLEPOST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//adding a like
export const addLike = (id) => async (dispatch) => {
  try {
    let res = await axios.put(`${baseUrl}/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//removing a like
export const removeLike = (id) => async (dispatch) => {
  try {
    let res = await axios.put(`${baseUrl}/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//deleting a post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//adding a post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    console.log("formdata", formData);
    let res = await axios.post(`${baseUrl}/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//adding a commnet
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    console.log("formdata", formData);
    let res = await axios.post(
      `${baseUrl}/api/posts/comment/${postId}`,
      { text: formData },
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//deleting a commnet
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
