//
const Sauces = require("../models/sauces")

exports.saucesController = async (req,res) => {
    try{ 
        console.log(req.body)
        console.log(req.body.sauces)
        res.status(201).send({message:"Nouvelles sauces créées"})
    }
     catch (error) {
        res.status(500).json({error}).send(console.log(error))
    }     
}

// function createSauces (req,res) {
//     const product = new Product({
//         userId : "",
//         name : "",
//         manufacturer : "",
//         description : "",
//         mainPepper : "",
//         imageUrl : "",
//         heat : 5,
//         likes : 6,
//         dislikes : 9,
//         usersLiked : [""],
//         usersDisliked :[""]

//     })
//     product.save().then((res)=> console.log("sauce enregistrée", res)).catch(console.error)
// }

// module.exports = {createSauces}