import React, { Component, Fragment } from 'react';
import * as authorService from '../../services/author';
import * as userService from '../../services/user';
// import * as authorService from '../services/author';
import { Redirect } from 'react-router-dom';
import * as baseService from '../../services/base';
import IndeterminateProgress from '../utilities/indeterminateProgress';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
            checkingLogin: false
        };
    }

    componentDidMount() {
        authorService.all();
    }

    signup(data) {
        authorService.insert(data)
        .then((response) => {
            if (response.ok) {
                return response.json()
                .then((jsonResponse) => {
                    baseService.setAuthToken(jsonResponse.token);
                    loggedIn = true;
                });
            } else if (response.status === 401) {
                return response.json()
                .then((jsonResponse) => {
                    throw jsonResponse;
                });
            }
        });
    }
    // signup(e) {
    //     e.preventDefault();
        
        // let data= [
        //     this.state.email, 
        //     this.state.password
            
        // ]
        // //data = this.state.data;
        // authorService.insert(data)
        // .then(() => {
        //     this.setState({ redirectToReferrer: true });
        // }).catch((err) => {
        //     if (err.message) {
        //         this.setState({ feedbackMessage: err.message });
        //     }
        // });
    // }

    handleEmailChange(value) {
        this.setState({ email: value});
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
                <h3 style={{textAlign: 'center'}}>Become a Member!</h3>
                <hr style={{backgroundColor:'white', width:'75%'}}/>
                <form onSubmit={(e) => this.signup(e)}>
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
                    <button type="submit" value="Signup" className="btn btn-danger"> Signup </button>
                </form>
                </div>
                </div>
                </div>
                </div>
            </Fragment>
       );
    }
}

export default Signup;
