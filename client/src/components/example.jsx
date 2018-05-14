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
            users: [
                // { 'id': 1, 'title': 'barney',  'content': 'false' },
                // { 'id':2,'title': 'fred',    'content': 'false' },
                // { 'id':3, 'title': 'pebbles', 'content': 'true' }
              ]
            
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getBlog();
        
    }

    getBlog() {
        fetch('/api/users')
            .then((response) => {
                return response.json();
            }).then((blogs) => {
                console.log(blogs);
                this.setState({
                    blogs
                })
            }).catch((err) => {
                console.log(err);
            });
    }
    // handleSearchChange(event) {
    //     this.setState({text: event});

    // }

    // handleSearch(event) {
    //    console.log('eee ' + event.target.value);
    //     let searchQuery = event.target.value;
    //     let displayedContacts = this.state.blogs.filter(function(el) {
    //         let searchValue = el.name;
    //         console.log(searchValue);
    
    //       return searchValue.indexOf(searchQuery) !== -1;
    //     });
    
    //     this.setState({
    //       blogs: displayedContacts
    //     });
    //   }
    handleSearch(event) {
        console.log('eee ' + event.target.value);
         let searchQuery = event.target.value;
         let displayedContacts = this.state.blogs.filter(function(el) {
             let searchValue = el.title;
             console.log(searchValue);
     
           return searchValue.indexOf(searchQuery) !== -1;
         });
     
         this.setState({
           blogs: displayedContacts
         });
       }
    
    getBlogMatch() {
        fetch('/api/users')
        .then((response) => {
            return response.json();
        }).then((blogs) => {
            console.log('from get blog match' +   blogs);
            
            console.log(blogs);
            let blog = Object.keys(blogs);
            console.log(blog);
            //console.log('state' + blog);
            let newArr = [];
                for (let i of blog) {
                    newArr.push[i];
                    //newArr.push(blogs[i].content);
                    //console.log(i);
                    //console.log('keyssss ' + blogs[i].content);
                }
                console.log(newArr);
                //console.log('hey ' +newArr);
        }).catch((err) => {
            console.log(err);
        });

    }
    addBlog(title, content) {
        fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, content
            })
        }).then(() => {
            this.getBlog();
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
            <div className="container">
            <input 
                    onChange={this.handleSearch}
                    placeholder = "Search for a blog"
                />

                <ul className="contacts-list">
          {
            this.state.users.map((el, index) => {
              return <Contact 
                key={el.id} 
                id={el.id} 
                title={el.title} 
                content={el.content}
              />;
            })
          }
        </ul>
            <div className="main">
            <Input postBlog={(title, content) => { this.addBlog(title, content); }} />
            <div className="row">
            {this.state.blogs.map((blog, index) => {          
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
