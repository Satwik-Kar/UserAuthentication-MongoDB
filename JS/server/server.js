const express = require('express')
const path = require('path'); // Import the 'path' module

const app = express()
const port = 3000
app.get('/',(req, res) =>{

    res.redirect('/login')

})
app.get('/login',(req, res) =>{
    const filePath = path.join(__dirname,"../..","HTML","login.html")
    res.sendFile(filePath)

})
app.listen(port,() =>{

    console.log("Server is listening in port "+port)
})
