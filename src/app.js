import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import rootReducer from './reducers/index';
import App from './components/App';
import Posts from './components/Posts';
import PostNew from './components/PostNew';
import PostShow from './components/PostShow';

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxPromise)
);

ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory} >
				<Route path='/' component={App}>
					<IndexRoute component={Posts} />
					<Route path='posts/new' component={PostNew} />
					<Route path='posts/:id' component={PostShow} />
				</Route>
			</Router>
		</Provider>,
		document.getElementById('app')
);