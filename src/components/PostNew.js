import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createPost} from '../actions/index';

const renderField = ({input, label, type, textarea, meta: {touched, error, invalid}}) => {
	const inputType = <input {...input} type={type} className='form-control' />;
	const textareaType = <textarea {...input} type={type} className='form-control' />
	return (
		<div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
		<label>{label}</label>
		{textarea ? textareaType : inputType}
		<div className='form-control-feedback'>
			{touched ? error : ''}
		</div>
	</div>
	);
}

class PostNew extends Component {
	constructor(props){
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object
	}

	onFormSubmit(props){
		this.props.createPost(props)
			.then(() => {
				this.context.router.push('/');
			});
	}

	render(){
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} >
				<h3>Create a new post</h3>
				<div>
					<Field name='title' component={renderField} label='Title' type='text' className='form-control' />
				</div>

				<div>
					<Field name='categories' component={renderField} label='Categories' type='text' className='form-control' />
				</div>

				<div>
					<Field name='content' component={renderField} textarea={true} label='Content' className='form-control' />
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

const form = reduxForm({
							form: 'PostNewForm',
							validate
						});

export default connect(null, mapDispatchToProps)(form(PostNew)); 