const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// This endpoint recieves CommentedCreated events and updates the
// status of the comment depeding on where the comment contains the
// string 'orange.'
app.post('/events', async (req, res) => {

    const {type, data } = req.body;

    if (type === "CommentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        console.log(`ON MODERATION SERVICE: comment with id ${data.id} has been updated with staus: ${status}`)
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated",
            data: { 
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }); 
    }

    res.send({});
});


app.listen(4003, () => {
    console.log('MODERARTION SERVICE listening on 4003')
})