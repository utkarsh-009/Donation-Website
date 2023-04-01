// Importing external modules and initialising variables
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

// MONGOOSE SPECIFIC STUFF
main().catch(err => console.log(err));
async function main() {await mongoose.connect('mongodb://127.0.0.1:27017/donationContacts');}

// DEFINING MONGOOSE SCHEMA 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String,
});
// Compiling schema into model 
const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); // Used to serve static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Sets template engine as pug
app.set('views', path.join(__dirname, 'views')); // Sets the views directory

/* ENDPOINTS */
// GET REQUEST
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

// POST REQUEST 
// [NOTE: If we have save data to database using post request with express then we need to 'npm install body-parser']
app.post('/contact',(req,res)=>{

    // Creating documents using above contact schema
    var myData = new Contact(req.body); // extracting body content from req
    
    // saving the document
    myData.save().then(() =>{
        res.send("The item has been saved to the db");
    }).catch(() =>{
        res.send(400).send("item could not be saved to the db");
    })

})

// START SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
})