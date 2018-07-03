import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = (props) => {
    
    if (isLoggedIn()) {
        return <Link className="btn btn-info" to="/logout">LOGOUT</Link>;
    } else {
        return <Link className="btn btn-info" to="/login">LOGIN</Link>;
    }
};

export default AuthButton;