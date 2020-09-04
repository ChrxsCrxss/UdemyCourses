import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"; 

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
        console.log(this.props)
    }

    postDataHandler = async () => {

        const Post = {
            title : this.state.title,
            body : this.state.content,
            author : this.state.author

        }; 

        // This is the method to send data to a sever. It is asynchronous 
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/`, { Post } )

        console.log(response); 

        this.setState({ submitted : true });

        // The history is just a stack of pages (endpoint resources). We can redirect by 
        // pushing an absolute url onto this history stack. '/x' becomes 'localhost:3000/x'
        // We have access to this routing prop because we wrapped the entire app inside the
        // BrowserRouter and withRouter components. You could also use .replace. but that 
        // is a pop-push method, so you wouldn't be able to navigate back 
        this.props.history.push('/');
        

    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;