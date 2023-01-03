//import model monDB
const Sauces = require("../models/sauces")
const Sauce =require("../models/sauces")
const Id = require ("../models/sauces")
const Put = require("../models/sauces")
const Delete = require("../models/sauces")
const Like = require("../models/sauces")

exports.createSauces = async (req,res) => {
    try{ 
        // res.status(201).send({message:"sauces créées"})
        const saucesObject = req.body.sauces;
        const sauces = await new Sauces({
            ...saucesObject
        })
        await sauces.save()
        res.status(201).send({message:"Nouvelles sauces enregistrées sur la BD"})
    }
     catch (error) {
        res.status(400).json({err})
    }
}

exports.getSauces = async (req,res) => {
    try{
       await Sauce.find()
       res.status(201).json(Sauce)
    }
    catch (error) {
        res.status(400).json({err})
    }
}

exports.singleSauce = async(req,res) => {
    try{
        await Id.findOne({ _id: req.params.id})
        res.status(200).json(Id)
     }
     catch (error) {
         res.status(404).json({error})
     }
}

exports.updateSauce = async (req,res) => {
    try{
        await Put.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        res.status(200).json({message:'Objet modifié!'})
     }
     catch (error) {
         res.status(400).json({error})
     }
}

exports.deleteSauce = async (req,res) => {
    try{
        await Delete.deleteOne({ _id: req.params.id })
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