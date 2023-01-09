//import model monDB
const SaucesCtrl = require("../models/sauces")

exports.createSauce = async (req,res) => {
  
    try{ 
        const saucesObject = req.body.sauces;
        console.log(req.body.sauces)
        // delete saucesObject._id;
        // delete saucesObject._userId;
    
        const saucesCtrl = new SaucesCtrl ({
            ...saucesObject
            // ,userId : req.auth.userId,
            // imageUrl:
            // `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        })
        await saucesCtrl.save()
        res.status(201).json({message:"Nouvelles sauces enregistrées sur la BD"})
    }
     catch (error) {
        res.status(500).json({error})
    }
}

exports.getSauce = async (req,res,next) => {
    try{
        console.log(SaucesCtrl)
        let AllSaucesCtrl = await SaucesCtrl.find()
        res.status(200).json(AllSaucesCtrl)
    }
    catch (error) {
        res.status(500).json({err})
    }
}

exports.singleSauce = async (req,res,next) => {
    console.log({_id : req.params.id})
    try{
        let One = await SaucesCtrl.findOne({ _id: req.params.id})
        res.status(200).json(One)
     }
     catch (error) {
         res.status(500).json({error})
     }
}

exports.updateSauce = async (req,res) => {
    console.log({_id : req.params.id})
    console.log({...req.body}) 
    try{
        // const saucesObject = req.file ? {
        //     ...JSON.parse(req.body.thing),
        //     imageUrl:
        //     `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // } : { ... req.body}

        // delete saucesObject._userId;
        // await SaucesCtrl.findOne({_id: req.params.id} )
        // if ( sauces.userId != req.auth.userId) {
        //     res.status(401).json({ message : 'Not authorized'})
        // } else {
       let updated = await SaucesCtrl.updateOne({ _id: req.params.id} , {...req.body,_id: req.params.id}) // {saucesObject, _id: req.params.id })
       console.log(updated) 
       res.status(200).json({message:'Objet modifié!'})
        // }   
    }
     catch (error) {
         res.status(500).json({error})
     }
}

exports.deleteSauce = async (req,res) => {
    console.log({_id : req.params.id})
    console.log({...req.body}) 
    try{
        let deleted = await SaucesCtrl.deleteOne({ _id: req.params.id })
        console.log(deleted)
        res.status(200).json({message:'Objet supprimé!'})
    }
    catch (error) {
        res.status(500).json({error})
    }
}

exports.likeSauce = async (req,res) => {
    try{
        res.status(200).json({message:'like/dislike'})
    }
    catch (error) {
        res.status(500).json({error})
    }
}