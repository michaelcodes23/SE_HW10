const express = require('express');

const app = express();
const port = 2000;
const pokemon = require('./models/pokemon.js');

//include the method-override package
const methodOverride = require('method-override')
//To display data without brackets
app.use(express.json())
//req.body
app.use(express.urlencoded({ extended: true}))
//tell system to read methodOverride
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'))
// css
app.use(express.static(__dirname + '/css'))
//Index
//localhost:3000/
app.get('/pokemon', (req , res) => {
    
    res.render('index.ejs',{
        data: pokemon
        });
});
//New Pokemon
app.get('/pokemon/new',(req, res) =>{
    res.render('new.ejs',{
        data: pokemon,
        imgUrl: pokemon.img
    })
});
//Show
app.get('/pokemon/:id', (req, res) => {
    console.log(pokemon[req.params.id]);
    res.render('show.ejs', {
        data: pokemon[req.params.id]
    })
})

//Post - New Pokemon
app.post('/pokemon', (req,res)=>{
    let updatePokemon = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    console.log('Req.body for new: ', req.body)
    pokemon.push(updatePokemon)
    res.redirect('/pokemon')
})
//Edit
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
//Update Route - for updating pokemon

app.put('/pokemon/:id', (req, res) => {
    console.log('Req.body is PUT: ', req.body)

    let updatedPokemon = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }

    
    pokemon[req.params.id] = updatedPokemon;
    console.log(pokemon[req.params.id])
    res.redirect('/pokemon/' + req.params.id);
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
