import React, { Component } from "react";
import axios from "axios"; 
import Post from "../../../components/Post/Post"; 
import classes from "./Posts.module.css"

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    // Remember, componentDidMount is called after the component is already rendered
    async componentDidMount() {

        console.log(this.props);
        
        // axios is a package for asychronous requests. Much sexier async-await syntax
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

            // Only store the first four fetched posts 
            const posts = response.data.slice(0, 4);


            const updatedPosts = posts.map(post => {

                // use spread operator to distriube properties of each post
                // and add another field, the author field 
                return {
                    ...post,
                    author: "Chris"
                }
            });

            this.setState({ posts: updatedPosts });
            console.log(response);


        } catch (err) {
            console.log(err);
        } finally {
            console.log('In finally block');;
        }
    }

    // callback to make posts selectable 
    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/' + id});
    }

    render() {


        // Use map to render a list of post element
        const Posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
            />
        })


        return (
            <section className={classes.Posts}>
                {Posts}
            </section>
        )
    }
}

export default Posts; 