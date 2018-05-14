import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import * as blogService from '../services/blogs';

class SingleBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objects: []
        }
        this.deleteBlog = this.deleteBlog.bind(this);
    }
    componentDidMount() {
        //this.getBlog();
        let id = this.props.match.params.id
        blogService.one(id)
        //.then(response => response.json())
        .then((object) => {
            this.setState({ objects: object })
            
        })
        
        
    }
    
    // getBlog() {
    // let url = '/api/blogs/' + this.props.match.params.id;
    // fetch(url, {
    //     method: 'GET',
    //     headers: new Headers({ 'Content-Type': 'application/json' })
    // })
    //     .then(response => response.json())
    //     .then((object) => {
    //         this.setState({ objects: object })
            
    //     })
    // }
    
    deleteBlog(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        blogService.destroy(id)
        // fetch(url, {
        //     method: 'DELETE',
        //     headers: new Headers({'Content-Type': 'application/json'})
        // })
        .then(this.props.history.push('/'))
    }
    
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <p>{this.state.objects.title}</p>
        <p>{this.state.objects.content}</p>
        <Link className="btn btn-primary my-1" to="/">Go Back to All Blog Postings</Link>
        <Link className="btn btn-secondary my-1" to={"/blogs/edit/" + this.props.match.params.id}>Edit Blog</Link>
        <button onClick={this.deleteBlog} className="btn btn-danger my-1"> Delete this post </button>
        
        
        
      </div>
    )
  }
}

export default SingleBlog;
