import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: "",
            image: "",
            imagePreviewUrl: ""
        }
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    handleTitleChange(title) {
        this.setState({ title });
    }
    handleContentChange(content) {
        this.setState({content})
    }
    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let value = e.target.files[0];
        let image = e.target.files[0].name;
        reader.onloadend = () => {
            this.setState({
                image: value,
                imagePreviewUrl: reader.result
            }
        )};
        reader.readAsDataURL(value);
    }
    
    render() {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
        imagePreview = (<img className='inputImage'src={imagePreviewUrl} />);
        }
        return (
        <div>
            <form id="myForm" name="myForm" method="post" action="/">
                <input 
                    name="title"
                    value= {this.state.title}
                    onChange={(event) => this.handleTitleChange(event.target.value)}
                    placeholder = "Enter the title"
                />
                <input 
                    name="content"
                    value= {this.state.content}
                    onChange={(event) => this.handleContentChange(event.target.value)}
                    placeholder = "Enter your content"
                />
                <input 
                    type='file'
                    name='image'
                    onChange= {(e) => {this.handleImageChange(e)}}
                />
                <button 
                    onClick = {() => {this.props.postBlog(this.state.title, this.state.content, this.state.image)}}
                >
                Post Blog
                </button>

                </form>
                {imagePreview}
           
        </div>
        )
    }
}


export default Input