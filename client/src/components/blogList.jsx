import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

class BlogList extends Component {
    constructor(props) {
        super(props)
    }
    getDateTime() {
        //gets the time from mysql 
        let time = this.props.blog.time;
        //formats it in moment
        let formattedDate = moment(`${time}`).utc().format("dddd, MMMM Do, h:mm A")
        return formattedDate;
        
    }

    //only display initial 100 characters
    lessContent () {
        let contentString = this.props.blog.content;
        let shortened = contentString.substring(0,100); 
        return shortened + '...';
    }
    
    render() {
    return (
        <React.Fragment>
            <div className="col-4" style={{marginBottom: '10px'}}>
            <div className="card text-center boxShadowLighterester">
                <div className="card-header">
                    <h4>{this.props.blog.title} </h4>
                    <FontAwesome
                        className='calendar-alt'
                        name='calendar-alt'
                    />
                    {this.getDateTime()}
                </div>
                <div className="card-body">
                    
                    <p className="card-text">{this.lessContent()}</p> 
                    {
                        this.props.blog.image != null && 
                       <img src={this.props.blog.image} className="card-text"></img> 
                    }
                    <button className="btn btn-primary buttonShadow"><Link to={"/blogs/" + this.props.blog.id}> <span className="cardLinks">Read More </span> </Link> </button>
                    {/*<button className="btn btn-dark"><Link to={"/blogs/" + this.props.blog.id}> <span className="cardLinks">Read More </span> </Link> </button> */}
                </div>
                
                
                </div>
            
            </div>
        
        </React.Fragment>
       
    )
  }
}

export default BlogList;
