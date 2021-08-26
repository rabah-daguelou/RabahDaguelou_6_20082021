// Importer mongoose
const mongoose=require('mongoose');

// Créer un schémas pour sauces avec la méthode Schema de Mongoose
const sauceSchema=mongoose.Schema(
    {
        userId: String, 
        name: String, 
        manufacturer: String,
        description: String,
        mainPepper: String,
        imageUrl: String,
        heat: Number,
        likes: Number,
        dislikes: Number,
        usersLiked: [String],
        usersDisliked: [String]
    },
    
    // Ajouter l'utilisateur dans la collection 'utilisateurs' de la BDD
    { collection : 'sauces' }
);

// Exporter le schéma en tant que modèle Mongoose
module.exports=mongoose.model('Sauce',sauceSchema);