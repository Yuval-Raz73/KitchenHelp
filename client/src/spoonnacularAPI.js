
const apiKey="bee9d26215cb4c4fb6365757c54e145d";
const head="https://api.spoonacular.com/food/";
const image="https://spoonacular.com/cdn/ingredients_100x100/";

export default {
    getIngredients: async function(query,number){
      let url=head+"ingredients/autocomplete?apiKey="+apiKey+"&query="+query+"&number="+number;
    return this.req(url);
    },
    req: async function(url){
      let response= await fetch(url);
      let json= await response.json();
      return  json;
    },
    getImageURL: function(text){
      return image+text;
    }
}