// Ce middelware sera appliqué avant les controleurs
// des routes. Pour chaque requête d'une route protégée
// on passera d'abord par ce middleware. Si on arrive à
// ELSE on passera la requête au prochain middleware

// Importer jwt pour vérifier les token
const jwt=require('jsonwebtoken');

// Exporter le middleware
module.exports=(req,res,next)=>{
   
    try {
 // Récupérer le token dans le header authorization
 // Le tableau renvoyé possède deux éléments bearer et token
 // On split l'espace et 
 // On récupère le 2ème élément token
      const token=req.headers.authorization.split(' ')[1];
    // Décoder le token avec la fonction verify de jwt
       // 1er argument le token, le second la clé secrète donnée
      // On obtient un objet JS
       const decodedToken= jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Récupérer le userId se trouvant dans le token
      const userId= decodedToken.userId;
        // Vérifier le userId
        // si le userId de la requête est différent de UserId
      if (req.body.userId && req.body.userId !== userId){
        // Envoyer une erreur
        throw 'User ID non valable!';
      } else {
        next();
      }
    }

    // Gérer les erreurs
    catch (error) {
      // Renvoyer l'erreur reçue ou un message
        res.status(401).json({ error:error | 'Requête non authentifiée!'});
    }
};