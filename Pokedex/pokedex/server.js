const express = require('express');
//remove all mongoos if edit page does not run all the way down to line 11
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const pokemon = require('./models/pokemon.js');
const app = express()
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
  // we're connected!
// });
//include the method-override package
const methodOverride = require('method-override')
const port = 2000;

//tell system to read methodOverride
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'))
//Index
//localhost:3000/
app.get('/pokemon', (req , res) => {
    res.render('index.ejs',{data: pokemon})
})
//New Pokemon
app.get('/pokemon/new',(req, res) =>{
    res.render('new.ejs')
});
//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {data: pokemon[req.params.id]})
})

//Post - New Pokemon
app.post('/pokemon',(req,res)=>{
    console.log(req.body)
    
    // const outputs = now.getElementById('output')
    // outputs.append(req.body)
    pokemon.push(req.body)
    res.redirect('/pokemon')
    console.log(pokemon.length)
  
})
//Update Route
app.put('/pokemon/:id', (req, res) => {
    console.log(req.body)
    pokemon[req.params.id] = req.body //in the pokemon array, find the index
    //that is specificed in the url. Set that element to the value of req.body (the input data)
    // res.redirect('/pokemon')
    res.render('index.ejs', {
        data: pokemon
      });
})
//Edit button
app.get('/pokemon/:id/edit', async (req, res) =>{
    // res.send('Update Pokemon' + req.params.id)
  res.render(
      'edit.ejs', //render views/edit.ejs
      {//pass in an object that contains
        // data: pokemon[req.params.id], //the pokemon object
        data: pokemon[req.params.id], //the pokemon object
        i: req.params.id //...and its indext in the array
      }
  )
})
//Delete button
app.delete('/pokemon/:id',(req,res)=>{
    // res.send('Delete Pokemon' + req.params.id)
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon')
})
console.log(pokemon.length);
//Port
app.listen(port,()=>{
    console.log('listening on port',port);
})
