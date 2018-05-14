import React from 'react';
import { CardElement } from 'react-stripe-elements';
  let CardElementStyle = {
        base: {
            fontSize: '18px',
            
        }
    }
class CardSection extends React.Component {

    render() {
        return (
            <React.Fragment>
            
            <CardElement id="inputCheckbox" className="form-control" style={CardElementStyle} />
            </React.Fragment>
        );
    }
};

export default CardSection;