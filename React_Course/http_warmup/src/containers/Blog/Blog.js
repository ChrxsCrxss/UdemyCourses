import React, { Component } from 'react';
import axios from "axios";
import Posts from "./Posts/Posts";

import FullPost from "./FullPost/FullPost";

// You have to import the Route object to route inside components
// The NavLink component should be used to implement React routing 
import { Route, NavLink, Switch} from "react-router-dom"; 


// import NewPost from "./NewPost/NewPost";

import asyncComponent from '../../hoc/asyncComponent';


// This is how we do lazy loading. We create a constant which is 
// the asyncComponent, and we pass this hoc a callback function 
// that uses the dynamic import syntax to load the NewPost 
// component. We then only call this AsyncNewPost method when
// the user clicks on the NewPost navlink, which is bound to 
// the 'new-post' URL, which is then routed via the Route
// element in the switch
const AsyncNewPost = asyncComponent( () => {

    return import("./NewPost/NewPost");  
})

class Blog extends Component {




    render() {

        return (
            <div>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/new-post'>New Post</NavLink></li>
                    </ul>
                </nav>
            </header>

                {/* You can route to JSX */}
                {/* <Route path='/' exact render={ () => <h1>Home</h1> } /> */}

                {/* You can also render a component. This is the more
                    conventional use case. Exact specifies that the 
                    URL must be an exact match, otherwise it is a greedy match. 
                    component specifies which component should be rendered */}

                <Switch>
                    <Route path='/' exact component={ Posts } />
                    <Route path='/new-post' exact component={ AsyncNewPost } />
                    <Route render={() => <h1>NOT FOUND</h1>} />
                    <Route path='/:id' exact component={ FullPost } />
                </Switch>
            </div>
        );
    }
}

export default Blog;