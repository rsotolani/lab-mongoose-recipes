import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import roteador from "./routes/recipes.routes.js";

//const express = require('express'); // importando express através do require

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciando o express na variável app.
const app = express();  

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json()); 

//conectando com o banco de dados
connect();

app.use("/recipe", roteador);

//const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
//const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
//const data = require('./data');



//por fim, colocar o servidor para "ouvir" os requests
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});