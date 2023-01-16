//import model monDB
const sauces = require("../models/sauces")
const SaucesCtrl = require("../models/sauces")

exports.createSauce = async (req,res,next) => { 
    try{ 
        const saucesObject = JSON.parse(req.body.sauce)
        saucesObject.imageUrl = `${req.protocol}://${req.get(`host`)}/images/${req.file.filename}`
        saucesObject.likes = 0
        saucesObject.dislikes = 0
        const saucesCtrl = new SaucesCtrl (saucesObject)

        await saucesCtrl.save()
        res.status(201).json({message:"Sauces enregistrées sur la BD"})
    }
     catch (error) {
        res.status(500).json({error})
    }
}

exports.getSauce = async (req,res) => {
    try{
        let AllSaucesCtrl = await SaucesCtrl.find({})
        res.status(200).json(AllSaucesCtrl)
    }
    catch (error) {
        res.status(500).json({err})
    }
}

exports.singleSauce = async (req,res) => {
    try{
        let One = await SaucesCtrl.findOne({ _id: req.params.id})
        res.status(200).json(One)
     }
     catch (error) {
         res.status(500).json({error})
     }
}

exports.updateSauce = (req,res) => {
    const saucesObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body}

    SaucesCtrl.updateOne({ _id: req.params.id} , {...saucesObject, _id: req.params.id })
        .then (() => res.status(200).json({message:'Objet modifié!'}))  
        .catch(error =>res.status(400).json({error}))
}

exports.deleteSauce = async (req,res) => {
    try{
        let deleted = await SaucesCtrl.deleteOne({ _id: req.params.id })
        console.log(deleted)
        res.status(200).json({message:'Objet supprimé!'})
    }
    catch (error) {
        res.status(500).json({error})
    }
}

exports.likeSauce = async (req,res,next) => {
    try{ 
        if (req.body.like === 1){
            await SaucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ likes : req.body.like++ },
                    $push: { usersLiked : req.body.userId},
                }
            ) 
            res.status(200).json({message: "1 like"})

        }  else if (req.body.like === -1) {
            await SaucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ dislikes : (req.body.like++) * -1},
                    $push: { usersDisliked : req.body.userId},
                }
            ) 
            res.status(200).json({message: "1 dislike"})
        } else {
            await SaucesCtrl.findOne({_id:req.params.id})

            if (sauces.usersLiked.includes(req.body.userId )){
                await SaucesCtrl.updateOne(
                    {_id: req.params.id},
                    {
                        $pull: { usersLiked:req.body.userId},
                        $inc: { like: -1}
                    }
                )
                console.log(SaucesCtrl)
                console.log(sauces.usersDisliked)
            res.status(200).json({message: "1 like retiré"})
                
            } else if (sauces.usersDisliked.includes(req.body.userId)){
                await SaucesCtrl.updateOne(
                    { _id : req.params.id},
                    { $pull: { usersDisliked: req.body.userId},
                      $inc: { dislikes: -1}
                    }
                )
                res.status(200).json({message: "1 dislike retiré"})
            }
        }
    } 
    catch (error) {
        res.status(500).json({error})
    }  
}