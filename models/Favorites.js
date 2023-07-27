const { default: mongoose } = require("mongoose");

const favoriteSchema = new mongoose.Schema(
    {
        idDrink: {
            type: String,
            required: true,
            trim: true,
        },
        strDrinkThumb: {
            type: String,
            required: true,
            trim: true,
          },
          strDrink: {
            type: String,
            required: true,
            trim: true,
          },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    {
        timestamps: true
    }
)

 module.exports=mongoose.model('Favorites', favoriteSchema)