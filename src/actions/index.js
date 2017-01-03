import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=rixwan19@gmail.com';

export function fetchPosts(){
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function createPost(props){
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

	return {
		type: CREATE_POST,
		payload: request
	}
}

export function fetchPost(id){
	var request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type: FETCH_POST,
		payload: request
	}
}

export function deletePost(id){
	var request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type: DELETE_POST,
		payload: request
	}
}