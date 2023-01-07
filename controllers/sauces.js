//import model monDB
const SaucesCtrl = require("../models/sauces")

exports.createSauce = async (req,res) => {
    try{ 
        const saucesObject =(req.body.sauces);
        delete saucesObject._id;
        delete saucesObject._userId;
        const saucesCtrl = await new SaucesCtrl ({
            ...saucesObject
            , userId : req.auth.userId,
            imageUrl:
            `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
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
       await SaucesCtrl.find()
       res.status(200).json(SaucesCtrl)
    }
    catch (error) {
        res.status(500).json({err})
    }
}

exports.singleSauce = async(req,res) => {
    try{
        await SaucesCtrl.findOne({ _id: req.params.id})
        res.status(200).json({
            message:"OK",
            contenu : {_id : req.params.id}
        })
     }
     catch (error) {
         res.status(500).json({error})
     }
}

exports.updateSauce = async (req,res) => {
    try{
        const saucesObject = req.file ? {
            ...JSON.parse(req.body.thing),
            imageUrl:
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ... req.body}

        delete saucesObject._userId;
        await SaucesCtrl.updateOne({_id: req.params.id} )
        if ( sauces.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'})
        } else {
            await SaucesCtrl.updateOne({ _id: req.params.id}, { ...saucesObject, _id: req.params.id })
            res.status(200).json({message:'Objet modifié!'})
        }
    }
     catch (error) {
         res.status(500).json({error})
     }
}

exports.deleteSauce = async (req,res) => {
    try{
        await SaucesCtrl.deleteOne({ _id: req.params.id })
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