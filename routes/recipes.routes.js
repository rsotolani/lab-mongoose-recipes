import express from "express";
import Recipe from "../models/Recipe.model.js";

const roteador = express.Router();

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


export default roteador
