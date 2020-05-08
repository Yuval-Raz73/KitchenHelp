const mongoose=require('mongoose');

const autoCompleteSchema= mongoose.Schema(
    {
        query: {
            type: String,
            required: true
        },

        ingredients:
        {
            type:[{
                name: String,
                image: String
            }]
        },

        date:{
            type:Date,
            default: Date.now
        }
    }
)

module.exports=mongoose.model('AutoComplete', autoCompleteSchema);