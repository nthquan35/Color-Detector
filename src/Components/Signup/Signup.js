import React from 'react';


class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	} 

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitSignup = () => {
		fetch('https://murmuring-taiga-01016.herokuapp.com/signup', {
		// fetch('http://localhost:8080/signup', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			this.props.loadUser(user);
			this.props.onRouteChange('signin');
		})
	}

	onKeyPressedSignup = (event) => {
		if(event.key === 'Enter'){
			this.onSubmitSignup();
		}
	} 

	render(){
		const {onRouteChange} = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center"
				onKeyDown={this.onKeyPressedSignup}>
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign up</legend>
					  <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				      	<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				      			type="text" 
				      			name="name"  
				      			id="name" 
				      			onChange={this.onNameChange}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="email" 
				        		name="email-address"  
				        		id="email-address" 
				        		onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="password" 
				        		name="password"  
				        		id="password" 
				        		onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitSignup} 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register"
				      	/>
				    </div>
				    <div className="ma2">
				      <input
				      	onClick={() => onRouteChange('signin')} 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Return to sign in"
				      	/>
				    </div>
				  </div>
				</main>
			</article>
		);
	}

}

export default Signup; 