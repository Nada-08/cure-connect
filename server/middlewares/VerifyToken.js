const jwt = require('jsonwebtoken')
const User = require('../models/Users.model')

const verifyToken = async (req, res, next)=>{
    let authHeader = req.headers.authorization

    let token = authHeader.split(' ')[1]

    if(token){
        let data = jwt.verify(token, process.env.JWT_SECRET_KEY)

        let loggedInUser = await User.findById(data.id)

        req.role = loggedInUser.role
        next()
    }else{
        res.status(401).json({error: 'Unauthorized'})
    }
}
module.exports = verifyToken