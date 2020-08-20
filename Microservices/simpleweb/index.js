const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Double up! Three or four times, no lies I just run it up. Never let a hard time humble us');
});


app.listen(8080, () => {
    console.log('listening on port 8080');
}); 