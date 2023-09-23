const express = require('express')
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true });
const parser = require('body-parser')
const app = express()
const dirName  = path.join(__dirname,'../..')
app.use(express.static(dirName));
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

const port = 3000
app.get('/',(req, res) =>{

    res.redirect('/login')

})
app.get('/login',(req, res) =>{

    res.sendFile(`${dirName}/HTML/login.html`)

})
app.get('/register',(req, res) =>{
    res.sendFile(`${dirName}/HTML/Registration.html`)

})
app.post('/register',async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    res.json({"user": email, "password": password})
    await client.connect(function (err) {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }

        console.log('Connected to MongoDB');

        const db = client.db("AppFirst");


        const collection = db.collection('UsersMailAndPassword');

        const dataToInsert = [
            {email: email, password: password},{email: email, password: password}
        ];

        // Insert the data
        collection.insertMany(dataToInsert, function (err, result) {
            if (err) {
                console.error('Error inserting data:', err);
            } else {
                console.log(`${result.insertedCount} documents inserted`);
            }

            // Close the connection
            client.close();
        });
    });



})
app.listen(port,() =>{

    console.log("Server is listening in port "+port)
})
