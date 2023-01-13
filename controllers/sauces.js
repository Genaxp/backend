//import model monDB
const SaucesCtrl = require("../models/sauces")

exports.createSauce = async (req,res) => { 
    try{ 
        const saucesObject = JSON.parse(req.body.sauces)
        console.log(saucesObject)
        delete saucesObject._id
    
        const saucesCtrl = await new SaucesCtrl ({
            ...saucesObject,
            imageUrl:
            `${req.protocol}://${req.get(`host`)}/images/${req.file.filename}`
        })
        await saucesCtrl.save()
        res.status(201).json({message:"Sauces enregistrées sur la BD"})
    }
     catch (error) {
        res.status(500).json({error})
    }
}

exports.getSauce = async (req,res) => {
    try{
        console.log(SaucesCtrl)
        let AllSaucesCtrl = await SaucesCtrl.find()
        res.status(200).json(AllSaucesCtrl)
    }
    catch (error) {
        res.status(500).json({err})
    }
}

exports.singleSauce = async (req,res) => {
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
    try{
        const saucesObject = await req.file ? {
            ...JSON.parse(req.body.sauces),
            imageUrl:
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ... req.body}

        await SaucesCtrl.findOne({_id: req.params.id} )
        if ( sauces.userId != req.auth.userId) {
            res.status(400).json({ message : 'Not authorized'})
        } else {
       await SaucesCtrl.updateOne({ _id: req.params.id} , {...saucesObject, _id: req.params.id })
       res.status(200).json({message:'Objet modifié!'})
        }   
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

exports.likeSauce =(req,res) => {
    try{
        if (req.body.like === 1){
            SaucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ likes : req.body.like++},
                    $push: { usersLiked : req.body.userId},
                }
            ) 
            res.status(200).json({message: "1 like"})
        } 
        else if (req.body.like === -1) {
            SaucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ dislikes : req.body.like++ * -1},
                    $push: { usersLiked : req.body.userId},
                }
            ) 
            res.status(200).json({message: "1 dislike"})
        }
    } 
    catch (error) {
        res.status(500).json({error})
    }  
}