import React, { Fragment, Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <Fragment>  
      <div className="container mt-3">
        <div className="jumbotron boxShadowLight" style={{}}>
           <h3 style={{textAlign:"center"}}>Blog Details</h3>
           <p>This project was created to illustrate the use of: </p>
           <p>React, NodeJS, ExpressJS, MySQL, Passport, Bcrypt, Stripe, Mailgun, and Bootstrap </p>
           <p> More details to come </p>
           <hr className="my-4" />
           <p> </p>
           <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-danger mx-auto"><a className="linkNoDecoration" target='_blank' href="https://github.com/alanpramuk9/ReactBlog">View the Code </a> </button>
          
           </div>
</div>
        </div>
      </Fragment>
    )
  }
}
