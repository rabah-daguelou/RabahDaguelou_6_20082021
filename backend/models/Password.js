const passwordValidator=require('password-validator');
const passwordSchema=new passwordValidator();

passwordSchema
    .is().min(8) // minimum 8 caractères
    .is().max(24) // maximum 24 caractères
    .has().uppercase() // Majuscule
    .has().lowercase() // Miniscule
    .has().digits() //Chiffre
    .has().not().spaces() // Pas d'espace
    .is().not().oneOf(['password']); // Ne doit pas être

module.exports=passwordSchema;