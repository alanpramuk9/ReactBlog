import React, { Fragment, Component } from 'react';
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
        let id = this.props.match.params.id
        blogService.one(id)
        .then((object) => {
            this.setState({ objects: object })
        })    
    }

    deleteBlog(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        blogService.destroy(id)
        .then(this.props.history.push('/'))
    }
    
    render() {
        return (
        <Fragment>
            <div className="container">
                <div className="blogContainer boxShadow">
                    <h2 style={{marginBottom: '20px'}}>{this.state.objects.title}</h2>
                    <p style={{fontSize: '1.2em', marginBottom: '50px'}}>{this.state.objects.content}</p>
                         <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Link className="btn btn-light my-1" to="/">Go Back to All Blog Postings</Link>
                            <div style={{display: 'flex' , alignItems: 'flex-end'}}>
                                <Link className="btn btn-warning my-1 mx-2" to={"/blogs/edit/" + this.props.match.params.id}>Edit Blog</Link>
                                <button onClick={this.deleteBlog} className="btn btn-danger my-1 mx-2"> Delete this post </button>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
        )
    }
}

export default SingleBlog;
