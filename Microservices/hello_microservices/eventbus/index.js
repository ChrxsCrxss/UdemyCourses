const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json()); 

// Cache events 
const events = []; 


// This endpoint recieves events from services and broadcasts these events 
// to all services 
app.post('/events', (req, res) => {

    console.log("event recieved");

    // We don't know what the event is. It could be any data structure or type.
    // All we know is that we are going to publish this event to every service
    const event = req.body; 

    // store event
    events.push(event);

    // Posts
    axios.post('http://posts-clusterip-srv:4000/events', event); 

    // // Comments
    axios.post('http://comments-srv:4001/events', event); 

    // Query
    axios.post('http://query-srv:4002/events', event); 

    // // Moderation 
    axios.post('http://moderation-srv:4003/events', event); 

    // This gets sent back to the service that emitted the event 
    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});


app.listen(4005, () => {
    console.log('EVENTBUS listening on 4005');
})