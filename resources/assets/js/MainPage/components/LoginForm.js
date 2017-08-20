import React, { Component } from 'react';
import axios from 'axios';

export default class LoginForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : '',
			remember: '',
			errors: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateChange =this.updateChange.bind(this);
		this.emailError = this.emailError.bind(this);
		this.passwordError = this.passwordError.bind(this);

	};

	updateChange(event){
		const name=event.target.name;
		const value=event.target.value;
		this.setState({[name]:value});
	}

	handleSubmit(event){
		event.preventDefault();
		axios({
			method:'post',
			url:'/login',
			contentType:'application/json',
			headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
			data:{email:this.state.email,password:this.state.password,remember:this.state.remember}
		})
		.then((response) => {
			console.log(response);
		}).
		catch((error) => {
			console.log(error);
		});

		// fetch('/login',{method:'post',headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}, email: this.state.email, password:this.state.password,remember:this.state.remember})
		// .then((response) => {
		// 	response.json().then((data) => {
		// 		if(data.errors){
		// 			this.setState({errors :data.errors});
		// 		}

		// 	})
		// });
	}

	emailError(){
		if(this.state.errors){
			return (<span className="help-block">
                        <strong>Invalid Credentials</strong>
				 </span> );
		}
		else
			return;
	}

	passwordError(){
		if(this.state.errors){
			return (
				<span className="help-block">
                        <strong>{this.state.errors.first('password')}</strong>
                  </span>
				);
		}
		else
			return;
	}


	render() {
		return (

				<form className="form-horizontal" onSubmit={this.handleSubmit}>

            <div className="form-group">
                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                            <div className="col-md-6">
                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.updateChange}required autoFocus />

                               
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="col-md-4 control-label">Password</label>

                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control" onChange={this.updateChange} name="password" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" value={this.state.remember} onChange={this.updateChange} /> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>

                                <a className="btn btn-link" href="planmytrip.com/password/reset">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>

			);
	}


}