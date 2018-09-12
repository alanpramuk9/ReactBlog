import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as blogService from '../services/blogs';

class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            content: "",
            title: ""
          
        }       
        
    }

    componentDidMount() {
        blogService.one(this.props.match.params.id)
            .then((blog) => {
                let title = blog.title;
                let content = blog.content;
                this.setState({
                   
                    content: content,
                    title: title
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    handleTitleChange(title) {
        this.setState({ title });
    };

    handleContentChange(content) {
        this.setState({ content });
    };
    
    editThisBlog(content, title) {
        
        //let id = this.props.match.params.id;
        
        let backUrl = '/blogs/' + this.props.match.params.id;
        blogService.update(this.props.match.params.id, { content, title })
        .then(this.props.history.push(backUrl))
        .catch((err) => console.log(err));
    }
    
    render() {
        return (
            <Fragment>
                <div className="container" style={{}}>
                    <div className="editContainer boxShadow">
                            <form>
                                <div className="form-group editLabel">
                                    <label htmlFor="chirp-text">Edit Title:</label>
                                    <input type="text" className="form-control" value={`${this.state.title}`} onChange={(event) => this.handleTitleChange(event.target.value)} />
                                </div>
                                <div className="form-group mb-4 editLabel">
                                    <label htmlFor="chirp-text">Edit Content:</label>
                                    <textarea className="form-control txtboxShadow"
                                        style={{height: '45vh'}}
                                        value={`${this.state.content}`}
                                        onChange={(event) => this.handleContentChange(event.target.value)}></textarea>
                                </div>
                                <div style={{}}>
                                <button onClick={() => {this.editThisBlog(this.state.content, this.state.title );}} className="btn btn-danger editBtn">Submit Edit</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    
            </Fragment>
        )
    }
}

export default EditBlog;