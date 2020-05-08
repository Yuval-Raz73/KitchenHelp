require('dotenv/config');
const fetch= require("node-fetch")
const apiKey=process.env.SPOONACULAR_KEY;
const ingredientImage="https://spoonacular.com/cdn/ingredients_100x100/"

const req= async function(url){
  let response= await fetch(url)
  let json= await response.json()
  return  json;
}
const getIngredients= async function(query,number){
  let url="https://api.spoonacular.com/food/ingredients/autocomplete?apiKey="+apiKey+"&query="+query+"&number="+number;
  return req(url)
}

const getIngredientImageURL= function(str){
  return ingredientImage;
}

const getRecipies= async function(ingredients,number)
{
  let url="https://api.spoonacular.com/recipes/findByIngredients?"+
          "ingredients="+ingredients+"&number="+number+"&apiKey="+apiKey;
  return req(url);
}
const Spoonacular=
{
  getIngredients: getIngredients,
  getIngredientImageURL: getIngredientImageURL,
  getRecipies: getRecipies
}
module.exports= Spoonacular;


