const {body} = require('express-validator')
const {validationResult} = require('express-validator')

const requestBody = [

    body('email').notEmpty().isEmail(),
    body('password').isLength({min:4,max:8})
]

const requestValid = (req,res,next) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array().map(err=> `${err.path} is ${err.msg}`)})
    }

    next()
}

module.exports = {

    requestBody,
    requestValid
}