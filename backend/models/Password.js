const passwordValidator=require('password-validator');

// Schémas du mot de passe
const passwordSchema=new passwordValidator();

// Les propriétés
passwordSchema
.is().min(8) // minimum 8 caractères
.is().max(24) // maximum 24 caractères
.has().uppercase() // Majuscule
.has().lowercase() // Miniscule
.has().digits() //Chiffre
.has().not().spaces() // Pas d'espace
.is().not().oneOf(['rd231174','Rd-2311-1974']); // Ne doit pas être

module.exports=passwordSchema;