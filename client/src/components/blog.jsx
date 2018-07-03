import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import BlogList from './blogList';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
let imageName = require('../images/coding.jpg')

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            text: "",
            filterBlogs: [
            ]
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getBlog();
        
    }
    
    getBlog() {
        fetch('/api/blogs')
            .then((response) => {
                return response.json();
            }).then((blogs) => {
                console.log(blogs);
                this.setState({
                    blogs:blogs,
                    filterBlogs: blogs
                })
            }).catch((err) => {
                console.log(err);
            });
    }
    
    handleSearch(event) {
        console.log('Handle Search ' + event.target.value);
        let word = event.target.value;
         let searchQuery = word.toLowerCase();
         let displayedContacts = this.state.blogs.filter(function(el) {
            let word2= el.title;
            let searchValue = word2.toLowerCase();
             console.log(searchValue);
            
           return searchValue.indexOf(searchQuery) !== -1;
         });
     
         console.log('this is the blogs');
         console.log(this.state.blogs);
         this.setState({
           filterBlogs: displayedContacts
         });
       }
       
        
    render() { 
        
        console.log(this.state);
        return (
        <Fragment>
            <div className="jumbotron jumbotron-fluid jumbo boxShadowLighterest">
            <div className="container">
            <div className="mainArticle">
                <img src={imageName }  alt="codingImage" className="img-thumbnail imageMain" />
                <div className="mainContent">
                <div className="mainTitle">
                <h3>Programming Paradigms </h3>
                <div>
                <FontAwesome
                        className='calendar-alt'
                        name='calendar-alt'
                />
                <span> Friday, July 2nd, 7:32 AM </span>
                </div>
            </div>
            <div className="mainBody">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates veritatis quidem esse eius magnam unde tempora doloribus autem ad nemo nostrum, debitis corrupti? Vel, consequatur. Sunt odio quidem nisi officia fugit cupiditate est blanditiis, officiis iure repellendus ad, modi nobis. </p>
                 <button style={{alignSelf: 'flex-end'}} className="btn btn-danger buttonShadow">Read More </button>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div className="container">
            <div style={{}} id='success'></div>
            
            <div className="searchBox">
            <span className="searchTitle">Search for a blog by title: </span>
            <input id="searchShadow" style={{}} 
                    onChange={ this.handleSearch}
                    // placeholder = "Title"
            />
            </div>
            <div className="main">
            
            <div className="row">
            {this.state.filterBlogs.map((blog, index) => {          
                return (
                   
                    <BlogList key={blog.id} blog={blog}/>
                );

                })      
            }
            </div>
            </div>
            </div>
            
        </Fragment>
        )
    }
}

export default Blog;
