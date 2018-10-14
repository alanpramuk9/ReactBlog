import React, { Fragment, Component } from 'react';

import Input from './input';
import * as blogs from '../services/blogs';

class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: "",
            image: "",
            imagePreviewUrl: ""
        }
        //this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleTitleChange(title) {
        this.setState({ title });
    };

    handleContentChange(content) {
        this.setState({ content });
    };
    insertAfter() {
           let para = document.createElement("h1");
           let node = document.createTextNode("append already!");
           para.appendChild(node);
           let m = document.getElementById('success');
           m.appendChild(para);
    }

    handlePost(title, content) {
        blogs.insert({ title, content })
            .then((result) => {
                this.props.history.push('/');
            }).catch((err) => {
                console.log(err)
            });
    }

    render() { 
        return (
            <Fragment>
                <div className="container">
                <div className="addContainer boxShadow">
                <h3 style={{color: 'white', textAlign: 'center'}}> Add a Blog Post </h3>
                <hr className="addUnderline boxShadowLighterester"/>
                <div>
                <form id="myForm" name="myForm" method="post" action="/">
                <div className="input-group">
                <input 
                    autoComplete="off"
                    className="form-control mb-4"
                    type="text"
                    name="title"
                    value= {this.state.title}
                    onChange={(event) => this.handleTitleChange(event.target.value)}
                    placeholder = "Enter The Title of Your Post"
                />
                </div>
                <div className="input-group">
                <textarea
                    autoComplete="off"
                    className="form-control mb-4 writeBlog"
                    name="content"
                    value= {this.state.content}
                    onChange={(event) => this.handleContentChange(event.target.value)}
                    placeholder = "Start Writing Your Post"
                ></textarea>
                </div>
                {/*}
                <input 
                    //value={this.state.image}
                    type='file'
                    name='image'
                    //onChange={(event) => this.handleImageChange(event.target.value)}
                    onChange= {(e) => {this.handleImageChange(e)}}
                    //onChange={(e)=>this.handleImageChange(e)}
                /> */}
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <button className="btn btn-danger postBtn boxShadowLighterest"
                    onClick = {() => {this.handlePost(this.state.title, this.state.content)}}
                >
                Post Blog
                </button>
                </div>
                </form> 
                </div> 
                </div>
                </div>
        </Fragment>
        )
    }
}

export default AddPost;
