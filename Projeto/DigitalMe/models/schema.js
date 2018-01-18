var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        email: {type: String, required: true},
        nome: {type: String, required: true},
        password: {type: String, required: true},
        genero: {type:String, required: true},
        data_nasc: {type:String}
<<<<<<< HEAD
    }, {collection: 'testes'}
=======
    },{collection:"testes"}
>>>>>>> 637a185caefd88757f12abe4ef037268d818e96a
)


module.exports = mongoose.model('UserData',UserSchema)