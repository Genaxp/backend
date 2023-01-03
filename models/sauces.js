//import mongoose
const mongoose = require ("mongoose");

//création nouvelle sauce
const Schema = mongoose.Schema({
    userId : {type :String, required : true },
    name : {type :String , required : true },
    manufacturer : {type :String , required : true },
    description : { type :String , required : true },
    mainPepper : { type :String , required : true },
    imageUrl : { type :String , required : true },
    heat : { type :Number },
    likes : { type :Number},
    dislikes : {type : Number},
    usersLiked : [ String ],
    usersDisliked :[ String ] 
});

module.exports = mongoose.model("sauces", Schema)