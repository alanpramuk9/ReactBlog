import React, { Fragment, Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import FontAwesome from 'react-fontawesome';

import InjectedCheckoutForm from './checkoutForm'; // must be a child of Elements wrapper

class Donate extends Component {
    render() {
        return (
            <Fragment>
                <div className="container" style={{marginTop: '20px', padding: '1.5em !important'}}>
                    <div className="jumbotron boxShadowLight" style={{ padding: '1.2em !important'}}>
                        <h4>This was implemented primarily to demonstrate usage of secure payments with Stripe  </h4>
                        <p style={{textAlign:'center'}}> However, feel free to send $10 if you're feeling generous! 
                        <span style={{marginLeft:'10px', color: 'yellow', fontSize: '1.2em'}}>
                            <FontAwesome
                                className='smile'
                                name='smile'
                            />
                        </span>
                        </p>
                    </div>
                    <StripeProvider apiKey="pk_test_KOdMth3iPAptakICNtxnw2nr">
                        <Elements>
                            <InjectedCheckoutForm />
                        </Elements>
                    </StripeProvider>
                </div>
            </Fragment>
        );
    }

}

export default Donate;