import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import recipeRoute from "./routes/recipes.routes.js";
import userRoute from "./routes/user.routes.js";


//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciando o express na variável app.
const app = express();  

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json()); 

//conectando com o banco de dados
connect();

app.use("/recipe", recipeRoute);
app.use("/user", userRoute);



//por fim, colocar o servidor para "ouvir" os requests
app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});