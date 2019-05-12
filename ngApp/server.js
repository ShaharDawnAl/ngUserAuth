const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const api = require('./server/routes/api');
app.use('/api',api);

app.get('/',(req,res) =>{
    res.send('hello from server');
});

// Point static path to public
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.set('port', port);
app.listen(port,function(){
    console.log("Server is running on port " + port);
});
