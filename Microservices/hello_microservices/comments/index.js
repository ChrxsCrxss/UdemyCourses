const express = require("express"); 
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {

  // Gerneate random ide
  const commentId = randomBytes(4).toString('hex');

  // destructure to get content 
  const { content } = req.body;

  // get comments associated with post with specified id
  const comments = commentsByPostId[req.params.id] || [];

  // create comment 
  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  // Emit an event to the event bus, which is later routed to the moderation 
  // service and query service.
  await axios.post('http://event-bus-srv:4005/events', {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  }); 


  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log("Recieved event on comments service", req.body.type);

  const {type, data} = req.body; 

  // Check to see if the event type is CommentModerated 
  if (type === "CommentModerated") {

    // Destructure the event to get some properties 
    const { postId, id, status, content } = data; 

    // search the posts by postId
    const comments = commentsByPostId[postId];

    // find the specific comment inside that post 
    const comment = comments.find(comment => {
      return comment.id === id; 
    })

    // update thes status of that post with the status
    // provided by the moderation service 
    comment.status = status; 

    // Emit an event the eventbust declaring that the comment
    // has been updated 
    await axios.post('http://event-bus-srv:4005/events', {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content
      }
    }); 
  }

  res.send({});
})

app.listen(4001, () => {
  console.log('COMMENTS SERVICE listening on 4001');
});