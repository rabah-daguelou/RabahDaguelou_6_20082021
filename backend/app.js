
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const helmet=require('helmet');
require('dotenv').config();

const path=require('path');
const userRoutes=require('./routes/user');
const sauceRoutes=require('./routes/sauce');

mongoose.connect(
  process.env.DatabaseUrl,
  { useNewUrlParser: true,
  useUnifiedTopology: true }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRoutes);
app.use('/api', sauceRoutes);

module.exports=app;