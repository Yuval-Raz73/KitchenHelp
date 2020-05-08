require('dotenv/config');
const mongoose= require('mongoose');
const Spoonacular= require('./spoonacularAPI');
const AutoComplete= require('./schemas/autocomplete');
const IngredientsToRecipes= require ("./schemas/ingredientsToRecipes");

const connectionString= "mongodb+srv://"
                        +process.env.DB_USER+":"+process.env.DB_PASSWORD+
                        "@cluster0-xobhb.mongodb.net/"+process.env.DB_COLLECTION
                        +"?retryWrites=true&w=majority";

const daysToUpdate= 3;
const autoCompleteSize=5;
const recipesListSize=10;

const objectFromDBIsRecent= function(obj)
    {
        if (!obj)
            return false;
        var currentDate=Date.now();
        var objDate=obj.date;
        return (currentDate - objDate) / (1000*60*60*24) < daysToUpdate;
    }

class MongooseManager{
    constructor()
    {
        mongoose.connect(connectionString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err)=>{
            if (err)
                console.log(err)
            else
                console.log("Connected to DB.")
        })
    }

    getIngredientImageURL()
    {
        return Spoonacular.getIngredientImageURL();
    }

    async getAutoComplete(query)
    {
        const oldAuto= await AutoComplete.findOne({"query":query});
        let response;
        if(objectFromDBIsRecent(oldAuto))
        {
            response= oldAuto.ingredients;
            console.log("Retrived autocomplete for \""+query+"\" from DB.");
        }
        else
        {
            let updatedIngredients= await Spoonacular.getIngredients(query,autoCompleteSize);
            await AutoComplete.updateOne(
                {
                "query": query
                },
                {
                    ingredients: updatedIngredients,
                    date: Date.now()
                },
                {
                    upsert: true
                });
            console.log("Recived autocomplete for \""+query+"\" from API and saved in DB.");
            response=updatedIngredients;
        }

        return response;
    }

    async getRecipiesByIngredietns(ingredients)
    {
        const sortedIngredients= ingredients.split(',').sort().join(',')
        const oldRecipies= await IngredientsToRecipes.findOne({"query":sortedIngredients});
        let response;

        if(objectFromDBIsRecent(oldRecipies))
        {
            response= oldRecipies.recipes;
            console.log("Retrived recipes for \""+sortedIngredients+"\" (sorted) from DB.");
        }
        else
        {
            const updatedRecipes= await Spoonacular.getRecipies(sortedIngredients, recipesListSize);
            let arrayToSave=[];
            
            updatedRecipes.forEach((recipe)=>
            {
                arrayToSave.push({
                    title: recipe.title,
                    image:recipe.image,
                    id:recipe.id
                })
            })
            await IngredientsToRecipes.updateOne(
                {
                    "query": sortedIngredients
                },
                {
                    recipes: arrayToSave,
                    date: Date.now()
                },
                {
                    upsert: true
                });
            console.log("Recived recipes for \""+sortedIngredients+"\"(sorted) from API and saved in DB.");
            response=arrayToSave;
        }

        return response;
    }
}

module.exports= MongooseManager;