import React, { Component } from 'react';

export default class LogForm extends Component{
	render(){ 
		return (
<form className="form-horizontal" method="POST" action="/login">

            <div className="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                            <div className="col-md-6">
                                <input id="email" type="email" className="form-control" name="email" required autoFocus />

                             
                            </div>
                        </div>

                        <div className="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label htmlFor="password" className="col-md-4 control-label">Password</label>

                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control" name="password" required />

                                
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" /> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>

                                <a className="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>

			);
	}

}