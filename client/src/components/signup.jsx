import React, { Component, Fragment } from 'react';
import * as userService from '../services/user';
import { Redirect } from 'react-router-dom';
import * as baseService from '../services/base';
import IndeterminateProgress from './utilities/indeterminateProgress';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            name: '',
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
    signup(e) {
        e.preventDefault();
        userService.newUser(this.state.name, this.state.email, this.state.password)
        .then(() => {
            this.setState({ redirectToReferrer: true });
        })
        .catch((err) => {
            if (err.message) {
                this.setState({ feedbackMessage: err.message });
            }
        });
    }
  
    handleNameChange(value) {
        this.setState({ name: value });
    }
    
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
           {/* <Redirect to={from} /> */}
           return (
               <Fragment>
                    <div style={{}}>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', width: '50%', margin: '40px auto'}}>
                        <p className="mx-auto" style={{textAlign:'center', fontSize:'1.4em'}}>Thank you for signing up!</p>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <a className="btn btn-warning w-50" href='/'>Go Back</a>
                        </div>
                        </div>
                    </div>
                </Fragment>
           );
       }

       return (
           <Fragment>
           <div className="jumbotron" style={{height:'86vh', marginBottom: '0px'}}>
           <div className="container" style={{}}>
           <div className="row align-items-center w-100">
           <div className="col-md-6 mx-auto mt-5 p-5 whitetext boxShadow" style={{backgroundColor:'#0094D8'}}>
                <h3 style={{textAlign: 'center'}}>Become a Member!</h3>
                <hr style={{backgroundColor:'white', width:'75%'}}/>
                <form onSubmit={(e) => this.signup(e)}>
                <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="form-control" type="name" onChange={(e) => this.handleNameChange(e.target.value)} required /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" className="form-control" type="email" onChange={(e) => this.handleEmailChange(e.target.value)} required /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} required /> 
                    </div>
                    {this.state.feedbackMessage ? (
                        <p className="warningMessage">{ this.state.feedbackMessage }</p>
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
