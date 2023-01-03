//import model monDB
const saucesCtrl = require("../models/sauces")
// const Sauce =require("../models/sauces")
// const Id = require ("../models/sauces")
// const Put = require("../models/sauces")
// const Delete = require("../models/sauces")
// const Like = require("../models/sauces")

exports.createSauce = async (req,res,next) => {
    try{ 
        const saucesObject = JSON.parse (req.body.sauces);
        delete saucesObject._id;
        delete saucesObject._userId;
        const sauces = await new sauces ({
            ...saucesObject,
            userId : req.auth.userId,
            imageUrl:
            `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        })

        await saucesCtrl.save()
        res.status(201).json({message:"Nouvelles sauces enregistrées sur la BD"})
    }
     catch (error) {
        res.status(400).json({err})
    }
}

exports.getSauce = async (req,res,next) => {
    try{
       await saucesCtrl.find()
       res.status(201).json(Sauce)
    }
    catch (error) {
        res.status(400).json({err})
    }

}

exports.singleSauce = async(req,res) => {
    try{
        await saucesCtrl.findOne({ _id: req.params.id})
        res.status(200).json(Id)
     }
     catch (error) {
         res.status(400).json({error})
     }
}

exports.updateSauce = async (req,res) => {
    try{
        const saucesObject = req.file ? {
            ...JSON.parse(req.body.thing),
            imageUrl:
            `${req.protoco}://${req.get('host')}/images/${req.file.filename}`
        } : { ... req.body}

        delete saucesObject._userId;
        await saucesCtrl.findOne({_id: req.params.id} )
        if ( sauces.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'})
        } else {
            await saucesCtrl.updateOne({ _id: req.params.id}, { ...saucesObject, _id: req.params.id })
            res.status(200).json({message:'Objet modifié!'})
        }
    }
     catch (error) {
         res.status(400).json({error})
     }
}

exports.deleteSauce = async (req,res) => {
    try{
        await saucesCtrl.deleteOne({ _id: req.params.id })
        res.status(200).json({message:'Objet supprimé!'})
    }
    catch (error) {
        res.status(400).json({error})
    }
}

exports.likeSauce = async (req,res) => {
    try{
        res.status(200).json({message:'like/dislike'})
    }
    catch (error) {
        res.status(400).json({error})
    }
}