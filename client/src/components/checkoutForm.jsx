import React, { Component, Fragment } from 'react';
import { injectStripe } from 'react-stripe-elements';
import { postCharge } from '../services/stripeService';

import CardSection from './cardSection';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerName: ''
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            let token = await this.props.stripe.createToken({name: this.state.customerName });
            
            await postCharge({ id: token.token.id, amount: 10 });
        } catch (e) {
            console.log(e);
        }
    }

    handleNameInput(e) {
        this.setState({ customerName: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
            <div className='container checkout boxShadow' id='checkout'>
            <div>
                <h4>Enter your card information: </h4>
            </div>
            <form className='checkoutForm' onSubmit={(e) => this.handleSubmit(e)}>
                <input className="form-control" onChange={(e) => this.handleNameInput(e)} placeholder="Name" htmlFor="name" id="name" />
                <CardSection />
                <button className="btn btn-primary checkoutButton">SUBMIT</button>
            </form>
            </div>
            </React.Fragment>
        );
    }
}

export default injectStripe(CheckoutForm);
