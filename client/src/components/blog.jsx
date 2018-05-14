import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';
import BlogList from './blogList';
import Input from './input';
import SingleBlog from './singleblog';
import Contact from './items';

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
        console.log('eee ' + event.target.value);
         let searchQuery = event.target.value;
         let displayedContacts = this.state.blogs.filter(function(el) {
             let searchValue = el.title;
             console.log(searchValue);
            
           return searchValue.indexOf(searchQuery) !== -1;
         });
     
         console.log('this is the blogs');
         console.log(this.state.blogs);
         this.setState({
           filterBlogs: displayedContacts
         });
       }
       
        
    
        addBlog(title, content, image) {
            const { id, title, content, tags, selectedFile } = this.state;
            let formData = new FormData();
            
            formData.append("id", id);
            formData.append("title", title);
            formData.append("content", content);
            formData.append("tags", tags);
            formData.append("selectedFile", selectedFile);
            var myForm = document.getElementById('myForm');
            console.log('form' +myForm);
            
        fetch('/api/blogs/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer bPHwvzKRGAPfFV2wXIlrm4cnJT3nFUZ8KUMmpkxJOgf+7ADabQ4=',
                
            },
            body: new FormData(myForm)
            // body: JSON.stringify({
            //     title, content, image
            // })
        }).then(() => {
            this.props.history.push('/');
            //this.getBlog();
        }).catch((err) => {
            console.log(err);
        });
    }   
    render() { 
        
        console.log(this.state);
        return (
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div id='success'></div>
            <div className="container">
            <h5> Add a blog post </h5>
            <Input postBlog={(title, content,image) => { this.addBlog(title, content,image); }} />
            <p>Search for a blog by title: </p>
            <input 
                    onChange={ this.handleSearch}
                    placeholder = "Title"
            />
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
            
        </div>
        )
    }
}

export default Blog;
