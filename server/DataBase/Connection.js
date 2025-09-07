const mongoose = require('mongoose')
const connection = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('DB Connected')
    })
}

module.exports = connection