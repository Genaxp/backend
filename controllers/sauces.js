
const saucesCtrl = require("../models/sauces")
const fs = require("fs")

exports.createSauce = async (req,res,next) => { 
    try{ 
        const saucesObject = JSON.parse(req.body.sauce)
        delete saucesObject._id
        const sauce = new saucesCtrl ({
            ...saucesObject,
            imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        await sauce.save()
        res.status(201).json({message:"Sauces enregistrées sur la BD"})
    }
    catch (error) {
        res.status(500).json({error})
    }
}

exports.getSauce = async (req,res,next) => {
    try{
        let AllSaucesCtrl = await saucesCtrl.find({})
        console.log(AllSaucesCtrl)
        res.status(200).json(AllSaucesCtrl)    
    }
    catch (error) {
        res.status(500).json({error})
    } 
}

exports.singleSauce = async (req,res,next) => {
    try{
        let One = await saucesCtrl.findOne({ _id: req.params.id})
        if (One === null){
            const message = "La sauce demandée n'existe pas"
            return res.status(404).json({message})
        }
        res.status(200).json(One)
    }  
    catch (error) {
        res.status(500).json({error})
    }
}

exports.updateSauce = async (req,res,next) => {
    try{    
        const saucesObject = req.file
            ? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            : { ...req.body }
          
        delete saucesObject._userId
        const sauce = await saucesCtrl.findOne({_id: req.params.id})
        if (sauce === null) {
            const messages = "La sauce n'a pas été trouvé"
            return res.status(404).json(messages) 
        }   
        else {        
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'}) 
            } else {
                if(req.file) {
                    const filename = './images/' + sauce.imageUrl.split('/').pop()
                    if(fs.existsSync(filename))
                        fs.unlinkSync(filename)
                } 
                await saucesCtrl.updateOne({ _id: req.params.id}, { ...saucesObject, _id: req.params.id})
                res.status(200).json({message : 'Objet modifié!'})
            }
        }        
    }
    catch (error) {
        res.status(500).json({error})
    }
}

exports.deleteSauce = async (req,res,next) => {
    try{       
        let deleted = await saucesCtrl.findOne({ _id: req.params.id })
        if (deleted === null ) {
            const messages = "La sauce n'a pas été trouvé"
            return res.status(404).json({messages})    
        } else { 
            if(deleted.userId != req.auth.userId){
                    res.status(401).json({message : "non autorisé à accéder à la sauce" })
            }  
            const filename = './images/'+ deleted.imageUrl.split('/').pop()
            if(fs.existsSync(filename))
                fs.unlinkSync(filename)
            await saucesCtrl.deleteOne({_id: req.params.id})                  
            const message = "la sauce a bien été supprimée"
            res.status(200).json({deleted, data : message})      
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.likeSauce = async (req,res,next) => {
    try{ 
        if (req.body.like === 1){
            await saucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ likes : 1 },
                    $push: { usersLiked : req.body.userId},
                }
            ) 
            res.status(201).json({message: "1 like"})
        }  else if (req.body.like === -1) {
            await saucesCtrl.updateOne (
                {_id: req.params.id},
                {
                    $inc :{ dislikes : 1},
                    $push: { usersDisliked : req.body.userId},
                }
            ) 
            res.status(201).json({message: "1 dislike"}) 
        } 
        else {
            sauces = await saucesCtrl.findOne({_id:req.params.id})
            if (sauces.usersLiked.includes(req.body.userId)){
                await saucesCtrl.updateOne(
                    {_id: req.params.id},
                    {
                        $pull: { usersLiked:req.body.userId},
                        $inc: { likes: -1}
                    }
                ) 
                res.status(201).json({message: "1 like retiré"})
            }  
            else if (sauces.usersDisliked.includes(req.body.userId)){
                await saucesCtrl.updateOne(
                    { _id : req.params.id},
                    { $pull: { usersDisliked: req.body.userId},
                      $inc: { dislikes: -1}
                    }
                )
                res.status(201).json({message: "1 dislike retiré"})
            }
        }
         if(req.body.like === null){
            const messages = "Le like n'a pas été trouvé"
            res.status(404).json({messages})
        }
    } 
    catch (error) {
        res.status(500).json({error})
    }  
}