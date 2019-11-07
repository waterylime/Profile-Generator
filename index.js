const express = require('express');
const bpdyParser = require('body-parser');
const path = require('path');

const port = 5000;

const app = express();

//set the public folder
app.use(express.static(path.join(-__dirname, 'public')));


//body parsesr middle ware
app.use(bodyParser.urlencoded({extended:true}));

//index route
app.get('/', (req, res) =>{
res.send('Hello World')
});


app.listen(port, () =>{
    console.log('server running at http://localhost:$(port)/');
})