import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {


    state = {
        post: {}
    }

    componentDidMount() {

        // If a prop was lifted from a post via the blog component 
        if (this.props.match.params.id) {

            console.log(this.props);

            // If there is already a local post object AND it is has the same id, 
            // no need to fetch data, halt execution here. This prevent the
            // the infinite loop 
            if (this.state.post && this.state.post.id === this.props.match.params.id) {
                return;
            }

            // Otherwise, fetch data and update state 
            axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`)
                .then(response => {
                    console.log(response);

                    // calling setState() inside componentDidUpdate will cause an
                    // infinite loop to occur. To avoid this, see the if-statement
                    // test above 
                    this.setState({ post: response.data })
                });
        }
    }

    deletePostHandler = () => {

        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
            .then(response => {
                console.log(response); 
            }); 
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id && this.state.post) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler}
                            className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;