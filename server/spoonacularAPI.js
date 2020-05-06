const fetch= require("node-fetch")
const apiKey="bee9d26215cb4c4fb6365757c54e145d"
const head="https://api.spoonacular.com/food/"
const image="https://spoonacular.com/cdn/ingredients_100x100/"

var req= async function(url){
  let response= await fetch(url)
  let json= await response.json()
  return  json
}
var getIngredients= async function(query,number){
  let url=head+"ingredients/autocomplete?apiKey="+apiKey+"&query="+query+"&number="+number;
  console.log("Recived autocomplete for \""+query+"\".");
  return req(url)
}

var getImageURL= async function(str){
  return image+str;
}

const Spoonacular=
{
getIngredients: getIngredients,
getImageURL: getImageURL
}
module.exports= Spoonacular;


