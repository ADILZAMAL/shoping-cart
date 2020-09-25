const express = require("express");
const joi = require("joi");
const router = express.Router();
const db = require("../db");
const shortId = require("shortid");
const multer = require("multer");
const product = db.get("product"); //Collection
const Schema = joi.object({
  // _id: joi.string(),
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().required(),
  price: joi.number().required(),
  availableSizes: joi.array().items(joi.string()),
});

//Read all products
router.get("/product", async (req, res) => {
  const products = await product.find({});
  res.json(products);
});

//Insert a data
router.post("/product", async (req, res, next) => {
  try {
    const newProduct = req.body;
    const validProduct = await Schema.validateAsync(newProduct);
    const Inserted = await product.insert(validProduct);
    res.send(Inserted);
  } catch (error) {
    next(error);
  }
});

//Delete One
router.delete("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await product.findOneAndDelete({ _id: id });
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
