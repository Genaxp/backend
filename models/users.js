//import mongoose
const mongoose = require ("mongoose");

// import mongoose-uniqie-validator
const uniqueValidator = require ("mongoose-unique-validator");

//création nouvel utilisateur
const usersSchema = mongoose.Schema({
    email: {type: String,required: true, unique: true},
    password : {type:String, required : true}
});

//création unique adresse email
usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", usersSchema)