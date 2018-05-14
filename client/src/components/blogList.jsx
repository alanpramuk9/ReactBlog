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
    
    render() {
    return (
        <React.Fragment>
            
            <div className="col-4">
            <div className="card text-center">
                <div className="card-header">
                    <h3>{this.props.blog.title} </h3>
                    <FontAwesome
                        className='calendar-alt'
                        name='calendar-alt'
                    />
                    {this.getDateTime()}
                </div>
                <div className="card-body">
                    <p className="card-text">{this.props.blog.content}</p> 
                    {
                        this.props.blog.image != null && 
                       <img src={this.props.blog.image} className="card-text"></img> 
                    }
                   
                </div>
                <Link to={"/blogs/" + this.props.blog.id}> See More </Link>
                
                </div>
            
            </div>
        
        </React.Fragment>
       
    )
  }
}

export default BlogList;
