import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Loader from 'halogen/PulseLoader';

import {fetchPosts} from '../actions/index';

class Posts extends Component {
	componentWillMount(){
		this.props.fetchPosts();
	}

	renderPosts(){
		var {posts} = this.props;
		
		var res = posts ? posts.length === 0 ?
											<div className='no-posts-message'>No posts to show</div> :
											posts.map(post => {
												return (
													<li className='list-group-item' key={post.id}>
														<Link to={`posts/${post.id}`}>
															<strong>{post.title}</strong>
															<span className='to-right'>{post.categories}</span>
														</Link>
													</li>
												);
		}) : <Loader className='loading-spinner' color="#26A65B" size="8px" margin="2px" />

		return res;
	}

	render(){
		return (
			<div>
				<div className='text-xs-right'>
					<Link to='/posts/new' className='btn btn-primary'>Add a post</Link>
				</div>
				<h3>Posts</h3>
				<ul className='list-group'>
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		posts: state.posts.all
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
