// Importing external modules and initialising variables
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); // Used to serve static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Sets template engine as pug
app.set('views', path.join(__dirname, 'views')); // Sets the views directory

/* ENDPOINTS */
// GET REQUEST
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
})

// START SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
})