const jwt = require('jsonwebtoken')
export function generateToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}