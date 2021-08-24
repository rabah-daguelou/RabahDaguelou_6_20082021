// Importer mongoose
const mongoose=require('mongoose');

// Importer unique Validator pluggin
const uniqueValidator=require('mongoose-unique-validator');

// Créer un schémas pour user avec la méthode Schema de Mongoose
const userSchema=mongoose.Schema(
    {
        email:{
            type:String, 
            required:true, 
           // Impossible de s'inscrire plusieurs fois avec la même adresse mail
            unique:true
        },

        password:{
            type:String, 
            required:true
        },
    
    },
    
    // Ajouter l'utilisateur dans la collection 'utilisateurs' de la BDD
    { collection : 'utilisateurs' }
);

// Aucun user ne peut partager la même adresse e-mail
userSchema.plugin(uniqueValidator);

// Exporter le schéma en tant que modèle Mongoose
module.exports=mongoose.model('User',userSchema);