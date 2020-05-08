const express = require('express');
const MongooseManager= require('./manageData/mongooseManager');
const app = express();

const port = process.env.PORT || 5000;
const database= new MongooseManager();

app.listen(port);
console.log('App is listening on port ' + port);

app.get('/auto/:query', async (req,res) => {
    var response= await database.getAutoComplete(req.params.query);
    res.json(response);
    console.log('Sent autocomplete for \"'+ req.params.query+'\".');
});


app.get("/ingimages", (req,res)=>
{
    let url= database.getIngredientImageURL()
    res.json(url);
    console.log("Sent url for ingredient images.");
})

app.get("/getRecipes/:ingredients", async (req,res)=>
{
    let response= await database.getRecipiesByIngredietns(req.params.ingredients);
    res.json(response);
    console.log("Sent recipies for "+req.params.ingredients+".");
})

