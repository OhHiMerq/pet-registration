const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded())
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',__dirname+'/views')


const db = {
    pets: []
}

app.get('/reg-form',(req,res) => {
    res.render('registration')
})

app.get('/profile/:petName',(req,res) => {
    let name = req.params.petName
    let pet = db.pets.find(pet => pet.name == name)
    res.render('profile',{data:pet})
})

app.get('/pet-list',(req,res) => {
    res.render('pet-list',{data:db.pets})
})

app.post('/submit-form',(req,res) => {
    db.pets.push(req.body)
    res.render('reg-result',{data:req.body})
})

app.get('/',(req,res) => {
    res.render('home')
})

app.listen(port,() => {
    console.log(`App listening on port: ${port}`)
})