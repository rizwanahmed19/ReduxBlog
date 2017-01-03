import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createPost} from '../actions/index';

class PostNew extends Component {
	constructor(props){
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props){
		this.props.createPost(props)
			.then(() => {
				this.context.router.push('/');
			});
	}

	render(){
		const {fields: {title, categories, content}, handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
				<h3>Create a new post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type='text' className='form-control' {...title} />
					<div className='form-control-feedback'>
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type='text' className='form-control' {...categories} />
					<div className='form-control-feedback'>
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className='form-control'  {...content} />
					<div className='form-control-feedback'>
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type='submit' className='btn btn-primary' >Submit</button>
				<Link to='' className='btn btn-danger'>Cancel</Link>
			</form>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({createPost: createPost}, dispatch);
}

function validate(values){
	const errors = {};

	if(!values.title){
		errors.title = 'Enter a title';
	}

	if(!values.categories){
		errors.categories = 'Enter categories';
	}

	if(!values.content){
		errors.content = 'Enter some content';
	}

	return errors;
}

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'PostNewForm',
	fields: ['title', 'categories', 'content'],
	validate
})(PostNew));