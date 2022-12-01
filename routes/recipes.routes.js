import express from "express";
import Recipe from "../models/Recipe.model.js";
import User from "../models/User.model.js";

const recipeRoute = express.Router();

//Criar uma receita
recipeRoute.post("/create", async (req, res) => {

    try {
      const form = req.body;
      const newRecipe = await Recipe.create(form);
      return res.status(201).json(newRecipe.title);
    } 
    catch (error) {
      console.log(error.errors);
      return res.status(500).json(error.errors);
    }
});

//Criar uma receita
recipeRoute.post("/create/:userId", async (req, res) => {

  try {
    const { userId } = req.params;

    //criar a receita com o usuario
    const newRecipe = await Recipe.create({
      ...req.body,
      user: userId
    });

    //atualizar o usuario agora para incluir a receita
    const userUpdated = await User.
      findByIdAndUpdate(
        userId,
        {
          $push: { recipes: newRecipe._id}
        },
        {
          new: true,
          runValidators: true
        }
      );

    return res.status(201).json(newRecipe);
  } 
  catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Criar varias receitas
recipeRoute.post("/create-many", async (req, res) => {

  try {
    const form = req.body;
    const newRecipes = await Recipe.insertMany(form);
    return res.status(201).json(newRecipes.title);
  } 
  catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//EDIT
recipeRoute.put("/edit/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body},
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedRecipe)

  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});


//DELETE
recipeRoute.delete("/delete/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const deleteRecipe = await Recipe.findByIdAndDelete(id);

    if (!deleteRecipe) return res.status(400).json({msg: "Receita não encontrada!"});

    const recipes = await Recipe.find();

    return res.status(200).json(recipes);

  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});


export default recipeRoute
