const Spoonacular= require("./spoonacularAPI");
const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// An api endpoint that returns a short list of items
app.get('/auto/:strToComplete', async (req,res) => {
    try{
    var strToComplete = req.params.strToComplete;
    var ingredients= await Spoonacular.getIngredients(strToComplete,5);
    res.json(ingredients);
    console.log('Sent autocomplete for \"'+ strToComplete+'\".');
    }
    catch(error)
    {
        console.log(error);
    }
});

app.get('/', (req,res) => {
    console.log("Someone is in the home page.");
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);