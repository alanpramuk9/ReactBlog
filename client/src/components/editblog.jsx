import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as blogService from '../services/blogs';

class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: []
        }       
        this.editThisBlog = this.editThisBlog.bind(this);
    }

    componentDidMount() {
        // let url = '/api/blogs/' + this.props.match.params.id;
        // fetch(url, {
        //     method: 'GET',
        //     headers: new Headers({ 'Content-Type': 'application/json' })
        // })
        //     .then(response => response.json())
        //     .then(object => this.setState({ object: object }))
        //let id = this.props.match.params.id;
        blogService.all();
    }
    
    editThisBlog(event) {
        event.preventDefault();
        let id = this.props.match.params.id;
        let obj = { content: this.inputElement.value };
        let backUrl = '/blogs/' + this.props.match.params.id;
        
        // fetch(url, {
        //     method: 'PUT',
        //     body: JSON.stringify(obj),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        blogService.update(id, obj)
        .then(this.props.history.push(backUrl))
        .catch((err) => console.log(err));
    }
    
    render() {
        return (
            <Fragment>
            <br></br>
            <br></br>
            <br></br>
                <div className="container border rounded mt-2 text-center" style={{ backgroundColor: `#FFFFFF` }}>
                    <div className="row">
                        <div className="col">
                            <form>
                                <div className="form-group p-1 m-1">
                                <label htmlFor="chirp-text">Edit Blog:</label>
                                    <input type="text" className="form-control p-1 m-1 bg-light" placeholder="Edit Content" ref={(a) => this.inputElement = a} />
                                    <button onClick={this.editThisBlog} className="btn btn-primary w-100 p-1 m-1">Submit Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EditBlog;