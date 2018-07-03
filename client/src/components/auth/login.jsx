import React, { Component, Fragment } from 'react';
import * as userService from '../../services/user';
import { Redirect } from 'react-router-dom';
import IndeterminateProgress from '../utilities/indeterminateProgress';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
            checkingLogin: true
        };
    }

    componentDidMount() {
        userService.checkLogin()
        .then((loggedIn) => {
            if (loggedIn) {
                this.setState({ redirectToReferrer: true, checkingLogin: false });
            } else {
                this.setState({ checkingLogin: false });
            }
        });
    }

    login(e) {
        e.preventDefault();
        userService.login(this.state.email, this.state.password)
        .then(() => {
            this.setState({ redirectToReferrer: true });
        }).catch((err) => {
            if (err.message) {
                this.setState({ feedbackMessage: err.message });
            }
        });
    }

    handleEmailChange(value) {
        this.setState({ email: value });
    }

    handlePasswordChange(value) {
        this.setState({ password: value });
    }

    render() {
       const { from } = this.props.location.state || { from: { pathname: '/' } };
       const { redirectToReferrer, checkingLogin } = this.state;

       if (checkingLogin) {
           return <IndeterminateProgress message="Checking Login Status..." />;
       }
       if (redirectToReferrer) {
           return (
               <Redirect to={from} />
           );
       }

       return (
           <Fragment>
                <div className="jumbotron" style={{height:'86vh', marginBottom: '0px'}}>
                <div classname="container" style={{}}>
                <div className="row align-items-center w-100">
                <div className="col-md-6 mx-auto mt-5 p-5 whitetext boxShadow" style={{backgroundColor:'#0094D8'}}>

                <h3 style={{textAlign: 'center'}}>Login to submit and edit posts</h3>
                <hr style={{backgroundColor:'white', margin: '15px 0px 40px 0px'}}/>
                <form onSubmit={(e) => this.login(e)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" className="form-control" type="email" onChange={(e) => this.handleEmailChange(e.target.value)} required /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} required /> 
                    </div>
                    {this.state.feedbackMessage ? (
                        <p>{ this.state.feedbackMessage }</p>
                    ): null}
                    <button type="submit" value="Login" className="btn btn-danger mx-auto my-2" >Login </button>
                </form>
                </div>
                </div>
                </div>
                </div>
            </Fragment>
       );
    }
}

export default Login;

// <form onSubmit={(e) => this.login(e)}>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input id="email" className="form-control" type="email" onChange={(e) => this.handleEmailChange(e.target.value)} required /> 
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input id="password" className="form-control" type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} required /> 
//                     </div>
//                     {this.state.feedbackMessage ? (
//                         <p>{ this.state.feedbackMessage }</p>
//                     ): null}
//                     <input type="submit" value="Login" className="btn btn-primary" />
//                 </form>