import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import HelloWorld from './hello';
import Blog from './blog';
import Header from './header';
import SingleBlog from './singleblog';
import EditBlog from './editblog';
import GoodbyeWorld from './goodbye';
import PrivateRoute from './auth/privateRoute';
import Login from './auth/login';
import Logout from './auth/logout';
import AuthButton from './auth/authButton';
import Signup from './auth/signup';
import Donate from './donate';
import Contact from './contact';

class Navigation extends Component {

    render() {
        return (
            <React.Fragment>
            <Router>
                <Fragment>
                <Link className="btn btn-info" to="/signup">Signup</Link>
                <Link className="btn btn-info" to="/donate">Donate</Link>
                <Link className="btn btn-info" to="/contact"> Contact Us </Link>
                <AuthButton />    
                <Switch>
                        <Route exact path="/" component={Blog} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/donate" component={Donate} />
                        <Route exact path='/contact' component={Contact}/>
                        <PrivateRoute exact path="/blogs/edit/:id" component={EditBlog} />
                        <Route exact path="/blogs/:id" component={SingleBlog} />
                        <PrivateRoute path="/goodbye" component={GoodbyeWorld} />
                </Switch>
                </Fragment>
            </Router>
           
            </React.Fragment>
        )
    }
}

export default Navigation;