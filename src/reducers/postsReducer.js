import {FETCH_POSTS, FETCH_POST, NULL_POST} from '../actions/index';

const INITIAL_STATE = {all: null, post: null};

export default function(state = INITIAL_STATE, action){
	switch (action.type) {
		case NULL_POST:
			return {...state, post: null}
		case FETCH_POST:
			return {...state, post: action.payload.data};
		case FETCH_POSTS:
			return {...state, all: action.payload.data};
		default:
			return state;
	}
}