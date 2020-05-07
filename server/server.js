const Spoonacular= require("./spoonacularAPI");
const express = require('express');
const path = require('path');

const app = express();

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

app.get("/ingimages", (req,res)=>
{
    let url= Spoonacular.getIngredientImageURL()
    res.json(url);
    console.log("Sent url for ingredient images.");
})

app.get("/getRecipies/:ingredients", async (req,res)=>
{
    let response= await Spoonacular.getRecipies(req.params.ingredients,10);
    res.json(response);
    console.log("Sent recipies for "+req.params.ingredients+".");
})


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);