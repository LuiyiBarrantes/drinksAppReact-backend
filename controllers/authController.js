const generateJWT = require('../helpers/generateJWT');
const generateRandomToken = require('../helpers/generateRandomToken');
const User = require('../models/Users')
var createError = require('http-errors');

const register = async(req,res) => { 
    const {name, email, password} = req.body       
    
    try {
        if ([name, email, password].includes('') || !name || !email || !password ) {
            throw createError(400, 'Todos los campos son obligatorios')
        }

        let user = await User.findOne({
            email
        })
        if (user) {
            throw createError(400, 'El email ya se encuentra registrado')
        }

        user = new User(req.body)
        user.token = generateRandomToken()
        const userStore = await user.save()

        //ToDo: enviar email de confirmacion de registro

        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado con exito'
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

 const login = async (req,res) => { 
    try {
        const {email, password} = req.body

        if ([ email, password].includes('') || !email || !password ) {
            throw createError(400, 'Todos los campos son obligatorios')
        }

        let user = await User.findOne({
            email
        })

        if (!user) {
            throw createError(400, 'Usuario inexistente')
        }
        if (await user.checkedPassword(password)) {
            return res.status(200).json({
                ok : true,
                token : generateJWT({
                    user : {
                        id : user._id,
                        name : user.name,
                    }
                })
            })
        } else {
            throw createError(403, 'credenciales invalidas')
        }
        
    } catch (error) {
        return res.status(error.status || 500).json(
            {
                ok: false,
                message: error.message || 'Upss, hubo un error'
            }
            )
    }
  }

 module.exports = {
    register,
    login
 }