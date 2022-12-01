import express from "express";
import Recipe from "../models/Recipe.model.js";
import UserModel from "../models/User.model.js";

const userRoute = express.Router();

// 2.1 Crie a rota POST /create
// Essa rota irá receber requests contendo um objeto com as informações do usuário: username, bio, age, email, isChef. Você pode acessar essas informações através do req.body.
// A rota deve:
// Criar um novo usuário com os valores recebidos da requisição, utilizando o userModel do usuário.
// Retornar uma response em JSON contendo o novo documento criado.
userRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;
    const newUser = await UserModel.create(form);
    
    return res.status(201).json(newUser);

  } catch (error) {
    console.log(error);
  return res.status(500).json(error.errors);
  }
});

// 2.2 Crie a rota GET /read/:userId
// Essa rota irá receber o userId pelos parâmetro de rota e deverá retornar apenas um usuário. Você pode acessar esses valores através de req.body e req.params para o parâmetro de rota.
// A rota deve:
// Retornar um único documento contendo as informações do usuário pelo _id
// Retornar uma response em JSON contendo as informações do usuário com a chave recipes populada. Lembre-se do .populate() 😉
userRoute.get("/read/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await UserModel.findById(userId).populate("recipes");
    
    if (!user) {
      return res.status(400).json({ msg: " Usuário não encontrado!" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});




export default userRoute;
