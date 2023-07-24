const { hash, compare } = require("bcryptjs");
const { default: mongoose } = require("mongoose");

const favoriteSchema = new mongoose.Schema(
    {
        drink: {
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

 module.exports=mongoose.model('Favorites', userSchema)