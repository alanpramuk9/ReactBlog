import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
        // let successAlert = $("<div></div>")
        //     .addClass("alert alert-success alert-dismissible fade show")
        //     .css({"margin": "10px", "padding": "10px" })
        //     .html("<h4 style={{textAlign:'center'}}>Blog successfully submitted</h4>")
        //     .prop("role", "alert")
        //let successAlert = $("<div></div>")
            //.addClass("alert alert-success alert-dismissible fade show")
            //.css({"margin": "10px", "padding": "10px" })
            //.html("<h4>Blog successfully submitted</h4>")
            //.prop("role", "alert")
           // console.log(successAlert);
           
           let para = document.createElement("h1");
           let node = document.createTextNode("append already!");
           para.appendChild(node);
           let m = document.getElementById('success');
           m.appendChild(para);
        //$(".searchBox").after("Lots of text asdfasdf asdfasdf asdf asfd");
    }

    handlePost(title, content) {
        blogs.insert({ title, content })
            .then((result) => {
                this.props.history.push('/');
            }).catch((err) => {
                console.log(err)
            });
    }

    //Add Blog with image support deleted for now! 
    //     addBlog(title, content, image) {
    //         let formData = new FormData();
    //         formData.append("title", title);
    //         formData.append("content", content);
    //         formData.append("image", image);
    //         var myForm = document.getElementById('myForm');
    //         console.log('form' +myForm);
            
    //     fetch('/api/blogs/', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer bPHwvzKRGAPfFV2wXIlrm4cnJT3nFUZ8KUMmpkxJOgf+7ADabQ4=',
                
    //         },
    //         body: new FormData(myForm)
    //         // body: JSON.stringify({
    //         //     title, content, image
    //         // })
    //     }).then(() => {
    //         this.props.history.push('/');
    //         //this.getBlog();
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // } 
    
    // Will handle the image change on next edit!
    // handleImageChange(e) {
    //     e.preventDefault();
    //     let reader = new FileReader();
    //    //console.log('e' +images.target.files[0].name);
    //    let value = e.target.files[0];
    //    let image = e.target.files[0].name;
    //    // let file = images;
    //     console.log(value);
    //     //reader.readAsArrayBuffer(images.name);
    //     //console.log('filesssss' + file.value);
    //     //console.log('valueee' +e.target.value);
    //     reader.onloadend = () => {
    //       this.setState({
    //         image: value,
    //         //image: file,
    //         imagePreviewUrl: reader.result
    //       }
    //     );
    //     console.log('reader read as text' +image);
    // }
    //     reader.readAsDataURL(value);
    //     //reader.readAsDataURL(file)
    //   } 
    render() { 
        // let {imagePreviewUrl} = this.state;
        // let imagePreview = null;
        // if (imagePreviewUrl) {
        // imagePreview = (<img className='inputImage'src={imagePreviewUrl} />);
        // }
        console.log(this.state);
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
