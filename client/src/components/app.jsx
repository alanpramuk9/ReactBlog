import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import HelloWorld from './hello';
import Blog from './blog';
import Header from './header';
import SingleBlog from './singleblog';
import EditBlog from './editblog';
import AddPost from './addpost';
import PrivateRoute from './auth/privateRoute';
import Login from './auth/login';
import Logout from './auth/logout';
import AuthButton from './auth/authButton';
import Signup from './signup';
import Donate from './donate';
import Contact from './contact';
import About from './about';
import Markdown from './markdown';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="navbar-brand" href="#"></p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav headerlinks">
                    <div className="headerLeft">
                    <li className="nav-item active">
                      <Link className="btn btn-info" to="/">HOME</Link> <span className="sr-only">(current)</span>
                    </li>
                    <li className="nav-item">
                    <Link className="btn btn-info" to="/about">ABOUT</Link>
                   </li>
                    <li className="nav-item">
                     <Link className="btn btn-info" to="/addpost">ADD POST</Link>
                    </li>
                    </div>
                    <div className="headerRight">
                    <li className="nav-item">
                      <AuthButton /> 
                    </li>
                    <li className="nav-item">
                     <Link className="btn btn-info" to="/signup">SIGNUP</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-info" to="/donate">DONATE</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-info" to="/contact">CONTACT </Link>
                    </li>
                   </div>
                  </ul>
                </div>
              </nav>
                
                <Switch>
                        <Route exact path="/" component={Blog} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/donate" component={Donate} />
                        <Route exact path="/markdown" component={Markdown} />
                        <Route exact path='/contact' component={Contact} />
                        <PrivateRoute exact path="/addpost" component={AddPost} />
                        <PrivateRoute exact path="/blogs/edit/:id" component={EditBlog} />
                        <Route exact path="/blogs/:id" component={SingleBlog} />
                        
                </Switch>
                </Fragment>
            </Router>
           
         
        )
    }
}

export default Navigation;