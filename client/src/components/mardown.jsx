import React, { Component, Fragment } from 'react';
let Markdown = require('react-remarkable');


class MarkdownComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }
    
  
   
    
    render() {
        return (
           <Fragment>
           <div className="jumbotron" style={{height:'86vh', marginBottom: '0px'}}>
           <div className="container" style={{}}>
                <h1> Hey there </h1>
                <Markdown source='**Markdown is awesome!** 
                
                ##Reasons React is great
                
                '/>
                <div>
                <Markdown>{`
                    # Reasons React is great
            
                         1. Server-side rendering
                            2. This totally works:
 
          
 
                         Pretty neat!
        `}</Markdown> </div>
            </div>
            </div>
            </Fragment>
       );
    }
}

export default MarkdownComp;
