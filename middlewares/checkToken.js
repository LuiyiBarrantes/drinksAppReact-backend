const createError = require('http-errors')
const { verify } = require('jsonwebtoken')
const User = require('../models/Users')

module.exports = async (req,res,next) => { 
    try {
    if (!req.headers.authorization) {
        throw createError(401, 'Se requiere un token')
    }

    const token = req.headers.authorization

    const decoded = verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.user.id).select('-password -token -checked -createdAt -updateAt -_id -__v')
    
    next()

} catch (error) {

    let message;

    switch (error.message) {
        case 'jwt malformed':
            message = 'El token está corrupto'
            
            break;
        case 'jwt expired':
            message = 'El token ha expirado'
            break;

        case 'invalid token':
            message = 'Token inválido'
            break;

        case 'invalid signature':
            message = 'Firma inválida'
            break;
        default:
            message = error.message
            break;
    }
    return res.status(errorstatus || 500).json({
        ok: fase,
        message : error.message || 'Ups... hubo un prolema'
    })
} }