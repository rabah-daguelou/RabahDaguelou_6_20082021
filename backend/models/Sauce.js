// Importer mongoose
const mongoose=require('mongoose');

// Créer un schémas pour sauces avec la méthode Schema de Mongoose
const sauceSchema=mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        manufacturer: { type: String, required: true},
        description: { type: String, required: true },
        mainPepper: { type: String, required: true},
        imageUrl: { type: String, required: true },
        heat: { type: Number, required: true},
        likes: { type: Number, required: true },
        dislikes: { type: Number, required: true},
        usersLiked: { type: [String], required: true },
        usersDisliked: { type: [String], required: true},  
    },
    
    // Ajouter l'utilisateur dans la collection 'utilisateurs' de la BDD
    { collection : 'sauces' }
);

// Exporter le schéma en tant que modèle Mongoose
module.exports=mongoose.model('Sauce',sauceSchema);