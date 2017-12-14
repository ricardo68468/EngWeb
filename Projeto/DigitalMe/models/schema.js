var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        email: {type: String, required: true},
        nome: {type: String, required: true},
        password: {type: String, required: true},
        género: {type:String, required: true},
        data_nasc: {type:String}
    }
)

module.exports = mongoose.model('User',UserSchema)