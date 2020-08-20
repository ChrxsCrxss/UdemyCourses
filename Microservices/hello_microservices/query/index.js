const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {}; 



// This is a helper function that encapsulates the 
// event-handling logic of the query service 
const handleEvent = (type, data) => {

       // Listen for a PostCreated event 
       if (type === "PostCreated") {
        const { id, title } = data; 
        posts[id] = { id, title, comments: [] }

    // Listen for CommentCreated event 
    } else if (type === "CommentCreated") {
        const { id, content, postId, status } = data; 

        const post = posts[postId]; 
        post.comments.push({ id, content, status  });

    // Listen for CommentUpdated event 
    } else if (type === "CommentUpdated") {
        const { id, content, postId, status } = data; 

        const post = posts[postId];

        const comment = post.comments.find(comment => {
            return comment.id === id; 
        });

        comment.status = status; 
        comment.conent = content; 

    }

}; 

app.get('/posts', (req, res) => {
    res.send(posts);
});


// This is the endpoint that talks to the eventbus. 
// Specifically, this endpoint recieves events from 
// the eventbus and processes them. Notice that the
// logic encapsulated within this endpoint can handle
// multiple event types and can also ignore event types
app.post('/events', (req, res) => {

    const {type, data} = req.body; 

    handleEvent(type, data);

    console.log(posts); 

    res.send({});
});


app.listen(4002, async () => {
    console.log('QUERY SERVICE listening on 4002');

    // This provides initialization-time synchronization by getting
    // all the events stored in the event bus and processing them
    const res = await axios.get('http://event-bus-srv:4005/events'); 

    for (let event of res.data) {
        console.log('processing event', event.type);
        handleEvent(event.type, event.data); 
    }
}); 