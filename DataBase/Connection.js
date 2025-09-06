const mongoose = require('mongoose')
const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/Cure-Connect').then(()=>{
        console.log('Database connected');
    })
}

module.exports = connection