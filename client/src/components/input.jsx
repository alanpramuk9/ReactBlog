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
        //this.handleImageChange = this.handleImageChange.bind(this);
        
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
           //console.log('e' +images.target.files[0].name);
           let value = e.target.files[0];
           let image = e.target.files[0].name;
           // let file = images;
            console.log(value);
            //reader.readAsArrayBuffer(images.name);
            //console.log('filesssss' + file.value);
            //console.log('valueee' +e.target.value);
            reader.onloadend = () => {
              this.setState({
                image: value,
                //image: file,
                imagePreviewUrl: reader.result
              }
            );
            console.log('reader read as text' +image);
            
            //}
            
            //console.log();
        }
            reader.readAsDataURL(value);
            //reader.readAsDataURL(file)
          }
    
    render() {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
        imagePreview = (<img className='inputImage'src={imagePreviewUrl} />);
        }
//     <form onSubmit={this.handleSubmit}>
//     <label>
//       Essay:
//       <textarea value={this.state.value} onChange={this.handleChange} />
//     </label>
//     <input type="submit" value="Submit" />
//   </form>
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
                    //value={this.state.image}
                    type='file'
                    name='image'
                    //onChange={(event) => this.handleImageChange(event.target.value)}
                    onChange= {(e) => {this.handleImageChange(e)}}
                    //onChange={(e)=>this.handleImageChange(e)}
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