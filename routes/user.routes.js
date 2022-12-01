import express from "express";
import Recipe from "../models/Recipe.model.js";
import User from "../models/User.model.js";

const userRoute = express.Router();

// 2.1 Crie a rota POST /create
// Essa rota irá receber requests contendo um objeto com as informações do usuário: username, bio, age, email, isChef. Você pode acessar essas informações através do req.body.
// A rota deve:
// Criar um novo usuário com os valores recebidos da requisição, utilizando o userModel do usuário.
// Retornar uma response em JSON contendo o novo documento criado.
userRoute.post("/create", async (req, res) => {
  try {
    const form = req.body;
    const newUser = await User.create(form);
    
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
    const user = await User.findById(userId).populate("recipes");
    
    if (!user) {
      return res.status(400).json({ msg: " Usuário não encontrado!" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// 2.3 Crie a rota PUT /update/:userId
// Esta rota irá receber o userId pelos parâmetros de rota para atualizar as informações do usuário e deve retornar uma response com os dados atualizados do usuário.
// A rota deve:
// Encontrar um usuário pelo _id e atualizar os campos que vieram na req.body
// Retornar uma response em JSON incluindo o documento atualizado do usuário.
userRoute.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// 2.4 Crie a rota DELETE /delete/:userId
// Essa rota irá receber o userId pelos parâmetros de rota para deletar um usuário e as receitas que esse usuário criou.
// A rota deve:
// Encontrar um usuário pelo _id e deletá-lo.
// Encontrar as recipes que esse usuário criou e deletá-las. Lembra do deleteMany()? 👀.
// Retornar uma response em JSON retornando apenas o status HTTP de 204.
userRoute.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).json({ msg: "Usuário não encontrado!" });
    }

    //deletar TODAS as receitas que o usuário é dono
    await Recipe.deleteMany({ user: userId })

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});


export default userRoute;
