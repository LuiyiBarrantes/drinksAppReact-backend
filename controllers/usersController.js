const createError = require("http-errors");
const Users = require("../models/Users");
const Favorites = require("../models/Favorites");

const profile = async (req, res) => {
  return res.status(200).json({
    ok: true,
    user: req.user
  })
}
/*  async function getData() {
   return Promise.resolve('data');
 }
 
 async function getMoreData(data) {
   return Promise.resolve(data + 'more data');
 } */
const toggleFavorite = async (req, res) => {
  try {
    
    if (!req.user) {
      throw createError(401, 'No estas autorizado')
    }
    const { favorites, _id } = req.user
    const { idDrink, strDrinkThumb, strDrink } = req.body;
    console.log(req.body);
    if (!idDrink || !strDrinkThumb || !strDrink) {
      throw createError(400, 'Se requieren todos los datos de la bebida')
    }
    const favoriteDrinkFound = await Favorites.findOneAndDelete({
      drink: idDrink,
      user: _id,
    });
    //const user = await Users.findById(_id)
    if (!favoriteDrinkFound) {
      const newFavorite = new Favorites({ drink: idDrink,
        strDrinkThumb,
        strDrink, user: _id });
      await newFavorite.save();
      req.user.favorites.push(newFavorite);
      } else {
       /* user.favorites = await favorites.user.favorites.filter((favorite) => 
      favorite._id.toString() !== favoriteDrinkFound._id.toString() )*/ 
      req.user.favorites = favorites.filter(
        (favorite) => favorite._id.toString() !== favoriteDrinkFound._id.toString()
      );
      }
      /* map(favorite => favorite._id !== favoriteDrinkFound._id) */
      await req.user.save();

      const user = await Users.findById(_id).select('-password -token -checked -createdAt -updatedAt -__v').populate('favorites','-createdAt -updatedAt -__v -user')
      /* await user.select('-password -token -checked -createdAt -updatedAt -__v').populate('favorites','-createdAt -updatedAt -__v -user')
      user.save() */
    return res.status(200).json({
      data: user
    })

  } catch (error) {
    return res.status(error.status || 500).json(
      {
        ok: false,
        message: error.message || 'Upss, hubo un error'
      }
    )
  }

}

/*  getAll().then((all) => {
   console.log('all the data')
 }) */

module.exports = {
  profile,
  toggleFavorite
}