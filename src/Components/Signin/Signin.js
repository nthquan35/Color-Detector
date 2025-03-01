import React from 'react';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isCorrect: true
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }


    onSubmitSignin = () => {
       fetch('https://murmuring-taiga-01016.herokuapp.com/signin', {
        // fetch('http://localhost:8080/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data === 'Wrong credential!' || data === 'Wrong credential.') {
                    this.setState({ isCorrect: false })
                } else {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
            })
    }

    onKeyPressedSignin = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitSignin();
        }
    }

    render() {
        const { onRouteChange } = this.props;
        const { isCorrect } = this.state;
        return ( 
            <article className = "br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center"
                onKeyDown = { this.onKeyPressedSignin } >
                <main className = "pa4 black-80" >
                    <div className = "measure" >

                        <fieldset id = "sign_up"
                            className = "ba b--transparent ph0 mh0" >
                            <legend className = "f2 fw6 ph0 mh0" > Sign In </legend> 
                            <div className = "mt3" >
                                <label className = "db fw6 lh-copy f6"
                                    htmlFor = "email-address" > Email </label> 
                                <input className = "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type = "email"
                                    name = "email-address"
                                    id = "email-address"
                                    onChange = { this.onEmailChange }
                                /> 
                            </div> 
                            <div className = "mv3" >
                                <label className = "db fw6 lh-copy f6"
                                    htmlFor = "password" > Password </label> 
                                <input className = "b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type = "password"
                                    name = "password"
                                    id = "password"
                                    onChange = { this.onPasswordChange }
                                /> 
                            </div> 
                            {
                                !isCorrect ?
                                    <p style = { { 'color': 'red' } } > Wrong username or password. </p> 
                                    :
                                    <p> </p>
                            } 
                        </fieldset> 
                        <div className = "" >
                            <input onClick = { this.onSubmitSignin }
                                className = "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type = "submit"
                                value = "Sign in" />
                        </div> 
                        <div className = "lh-copy mt3" >
                            <p onClick = {() => onRouteChange('signup') }
                                className = "f6 link dim black db pointer" > Sign up </p> 
                        </div> 
                    </div> 
                </main> 
            </article>
        );
    }
}

export default Signin;