var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        email: {type: String, required: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
        genero: {type:String},
        data_nasc: {type:String}
    }, {collection: 'testes'}
)


module.exports = mongoose.model('UserData',UserSchema)