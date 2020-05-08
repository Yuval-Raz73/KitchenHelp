const mongoose=require('mongoose');

const IngredientsToRecipesSchema= mongoose.Schema(
    {
        query: {
            type: String,
            required: true
        },

        recipes:
        {
            type:[{
                title: String,
                image: String,
                id: Number
            }]
        },

        date:{
            type:Date,
            default: Date.now
        }
    }
)

module.exports=mongoose.model('IngredientsToRecipes', IngredientsToRecipesSchema);