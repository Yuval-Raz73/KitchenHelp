const Spoonacular= require("./spoonacularAPI");
const express = require('express');
const path = require('path');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const AutoComplete= require('./schemas/autocomplete');

const app = express();

app.use(bodyParser.json());
app.get('/auto/:strToComplete', async (req,res) => {
    var strToComplete = req.params.strToComplete;
    const oldAuto= await AutoComplete.find({"query":strToComplete});
    let response;
    if(objectFromDBIsRecent(oldAuto))
    {
        response= oldAuto[0].ingredients;
        console.log("Retrived autocomplete for "+strToComplete+" from DB.");
    }
    else
    {
        let updatedIngredients= await Spoonacular.getIngredients(strToComplete,5);
        let newAuto= new AutoComplete(
            {
                query: strToComplete,
                ingredients: updatedIngredients,
                date: Date.now()
            }
        );
        await newAuto.save();
        console.log("Recived autocomplete for "+strToComplete+" from API and saved in DB.");
        response=updatedIngredients;
    }
    res.json(response);
    console.log('Sent autocomplete for \"'+ strToComplete+'\".');
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

mongoose.connect("mongodb+srv://yuvalraz73:iii5xw6m74@cluster0-xobhb.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true },
 (err)=>{
     if (err)
     console.log(err)
     else
    console.log("Connected to DB.")
})

const objectFromDBIsRecent= function(obj)
{
    if (!obj[0])
        return false;
    var currentDate=Date.now();
    var objDate=obj[0].date;
    return (currentDate - objDate) / (1000*60*60*24) < 3;
}
console.log('App is listening on port ' + port);

