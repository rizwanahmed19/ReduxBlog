import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPost, deletePost, nullPost} from '../actions/index';
import Loader from 'halogen/PulseLoader';
import {Link} from 'react-router';


class PostShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount(){
		this.props.fetchPost(this.props.params.id)
	}

	componentWillUnmount(){
		this.props.nullPost();
	}

	onDelete(){
		this.props.deletePost(this.props.params.id)
			.then(() => {
				this.context.router.push('/');
			});
	}

	render(){
		const {post} = this.props;

			const res = post === null ? 
										<Loader className='loading-spinner' 
											 color="#26A65B" 
											 size="8px" 
											 margin="2px" /> :
											<div>
												<h3>{post.title}</h3>
												<h6>Categories: {post.categories}</h6>
												<p>{post.content}</p>
											</div>

		return (
			<div>
				<Link to='/'>Back To Index</Link>
				<button 
					className='btn btn-danger to-right'
					onClick={this.onDelete.bind(this)}>
						Delete Post
					</button>
				{res}				
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		post: state.posts.post
	}
}

export default connect(mapStateToProps, {fetchPost, deletePost, nullPost})(PostShow);