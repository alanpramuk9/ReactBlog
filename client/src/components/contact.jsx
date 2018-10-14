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
            <div className='container'>
            <div className='contactContainer boxShadowLightest'>
                <h3 style={{color: 'white', textAlign: 'center'}}>Let's Get In Touch</h3>
                <hr style={{backgroundColor: 'white', width:'60%', marginBottom: '30px', height: '2px', boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'}}/>
                <form onSubmit= {(e) => this.handleSubmit(e)}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="contactLabel " style={{width: '45%'}}>
                        <label htmlFor="name2"> Name </label>
                        <input onChange={(e) => this.handleName(e.target.value )} id="name2" type="text" className="form-control" require/>
                    </div>
                    <div className="contactLabel" style={{width: '45%'}}>
                        <label htmlFor="email"> Email </label>
                        <input  onChange={(e) => this.handleEmail(e.target.value )}id="email" type="email" className="form-control" require />
                    </div>
                    </div>
                    <div className="form-group contactLabel">
                        <label htmlFor="message"> Message </label>
                        <textarea onChange={(e) => this.handleMessage(e.target.value )} cols="30" rows="10" className="form-control"></textarea>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <input type="submit" className="btn btn-danger w-50 p-2 mt-3"/>
                    </div>
                </form>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Contact;