// Importing external modules and initialising variables
require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

// To avoid unessecary warnings
mongoose.set('strictQuery', false);

// MONGOOSE SPECIFIC STUFF
main().catch(err => console.log(err));
// const connectionParams = {useNewUrlParser: true, useUnifiedTopology: true};
// async function main() {await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, {useUnifiedTopology: true});}

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose DB connected: ${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

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
connectDB.then(()=>{
    app.listen(port, ()=>{
        console.log(`This application started successfully on port ${port}`);
    })
})



// 'mongodb+srv://utkarshpatil2001:XoSxLRyp9iJeLy9L@cluster0.6driqbj.mongodb.net/formContacts'