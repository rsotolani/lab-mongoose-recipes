import express from "express";
import Recipe from "../models/Recipe.model.js";

const roteador = express.Router();

//Criar uma receita
roteador.post("/create", async (req, res) => {

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

//Criar varias receitas
roteador.post("/create-many", async (req, res) => {

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
roteador.put("/edit/:id", async (req, res) => {

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
roteador.delete("/delete/:id", async (req, res) => {

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


export default roteador
