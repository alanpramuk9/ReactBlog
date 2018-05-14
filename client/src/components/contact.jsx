import React, {Component} from 'react';
import {sendContactEmail} from '../services/contact'

class Contact extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            message: ''
        }

    }
    handleName (name) {
        this.setState({ name })
    }
    handleEmail (email) {
        this.setState({ email })
    }
    handleMessage (message) {
        this.setState({ message })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        sendContactEmail(this.state.name, this.state.email, this.state.message)
        .then(() => {
            //redirect to home page
            //alert('Message sent successfully');
            this.props.history.push('/');
            $("#success").addClass("alert alert-success alert-dismissible")
            let b = document.createElement("button");
            b.className = "successbutton close";
            b.setAttribute("type", "button");
            b.setAttribute("data-dismiss", "alert");
            b.innerHTML = "&times;";
            $("#success").css({
                "font-size": "18px",
                "margin": "0px 30px",
                "text-align": "center"
            })
            let p = document.createElement("p");
            let node = document.createTextNode(`Thank you ${this.state.name}. Email succcessfully sent!`);
            p.appendChild(node);
            let sucess = document.getElementById('success');
            $("#success").append(b, p);

        }).catch((err) => {
            console.log(err);
        })
        
    }
    render() {
        return (
            <React.Fragment>
            <br></br>
            <br></br>
            <br></br>
            <div className='container'>
                <form onSubmit= {(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="name"> Name </label>
                        <input onChange={(e) => this.handleName(e.target.value )} id="name" type="text" className="form-control" require/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"> Email </label>
                        <input  onChange={(e) => this.handleEmail(e.target.value )}id="email" type="email" className="form-control" require />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message"> Message </label>
                        <textarea onChange={(e) => this.handleMessage(e.target.value )} cols="30" rows="10" className="form-control"></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
            </React.Fragment>
        )
    }

}

export default Contact;