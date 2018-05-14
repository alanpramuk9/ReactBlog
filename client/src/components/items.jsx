import React, { Component } from 'react';
import { render } from 'react-dom';

class Contact extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
      return (
          <div>
            <li className="contact">
            <p>{this.props.id}</p>
            <div className="contact-info">
                <div className="contact-name">{this.props.title}</div>
                <div className="contact-number">{this.props.content}</div>
            </div>
            </li>
        </div>
      );
    }
}
 

export default Contact;