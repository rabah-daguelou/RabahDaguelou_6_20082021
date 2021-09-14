
const Sauce = require('../models/Sauce');
const fs= require('fs');


exports.createSauce= (req, res, next) => {
  const sauceObject= JSON.parse (req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersDisliked: [' ']
  });

sauce.save()
  .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
  .catch(error => res.status(400).json({error}));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject=req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
  }
    :{...req.body};
  
  Sauce.updateOne(
    {_id: req.params.id}, {...sauceObject, _id: req.params.id}
  )
  
  .then(() => res.status(201).json({ message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({error}));
};

// 5- SUPPRIMER LA SAUCE CHOISIE
exports.deleteSauce = (req, res, next) => {
  // Trouver la sauce à supprimer
  // la sauce dont l'id est envoyé dans les params de la requête
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      // Supprimer le fichier dans le dossier images
      fs.unlink(`images/${filename}`, () => {

        // Supprimer la sauce
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Supprimée !'}))
        .catch(error => res.status(400).json({ error}));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// 6- LIKER OU DISLIKER UNE SAUCE
exports.likeOrDislikeSauce = (req, res, next) => {
  let like    = req.body.like;
  let userId  = req.body.userId;
  let sauceId = req.params.id;

  // Etudier les trois cas 
  switch (like) {
      // Cas 1: like=1 / L'utilisateur aime la sauce
    case 1 :
        Sauce.updateOne(
          { _id: sauceId },
          { 
            // Ajouter l'utilisateur dans le tableau des utilisateurs ayant aimés la sauce
            $push: { usersLiked: userId },
            // Incrémenter le nombre de likes
            $inc: { likes: +1 }
          }
        )
          .then(() => res.status(200).json({ message: 'I like it !' }))
          .catch((error) => res.status(400).json({ error }))
            
      break;

    // Cas 2: like=0 / L'utilisateur annule son choix
    case 0 :
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            
            // Si userId se trouve dans le tableau [userLiked]
            if (sauce.usersLiked.includes(userId)) { 
              // On modifie la sauce via son id
              Sauce.updateOne(
                { _id: sauceId },
                { // Retirer l'utilisateur du tableau [userLiked]
                  $pull: { usersLiked: userId }, 
                  // Décrémente le nombre de likes
                  $inc: { likes: -1 }})

                .then(() => res.status(200).json({ message:'I annul!'}))
                .catch((error) => res.status(400).json({ error }))
            }

            // Si l'utilisateur se trouve dans [userDisliked]
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne(
                { _id: sauceId }, 
                { 
                  $inc: { dislikes: -1 },
                  $pull: { usersDisliked: userId },
                }
              )

                .then(() => res.status(200).json({ message: ' I annul! ' }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;
    
      // Cas 3: like=-1 / L'utilisateur n'aime pas la sauce
    case -1 :
        Sauce.updateOne(
          { _id: sauceId },
          { 
            $inc: { dislikes: +1 },
            $push: { usersDisliked: userId }, 
          }
        )
          .then(() => { res.status(200).json({ message: 'I dislike it!' }) })
          .catch((error) => res.status(400).json({ error }))
      break;
      
      default:
        console.log(error);
  }
}

