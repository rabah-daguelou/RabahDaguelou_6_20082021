const passwordSchema=require('../models/Password');

module.exports=(req,res,next)=>{
    if (!passwordSchema.validate(req.body.password)){
        res.status(400).json({message:'Ce mot de passe n\'est pas valide: min 8 caractères dont majuscule, miniscule et chiffre sans espace!'});
    } else {
        next();
    }
};