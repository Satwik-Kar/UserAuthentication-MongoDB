const express = require('express')
const path = require('path');
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
app.post('/register',(req,res)=>{

   const email = req.body.email
   const password = req.body.password

    res.json({"user":email,"password":password})


})
app.listen(port,() =>{

    console.log("Server is listening in port "+port)
})
