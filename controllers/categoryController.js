const asyncHandler = require("express-async-handler");
const Category = require("../model/categoryModel");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ title: req.body.title });
    if (existingCategory) {
      res.status(400).json({ message: "Category with this title already exists" });
      return;
    }
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).populate("user").sort("-createAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categorie = await Category.findById(id).populate("user").sort("-createAt");
    res.json(categorie);
  } catch (error) {
    res.json(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categorie = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(categorie);
  } catch (error) {
    res.json(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.json(error);
  }
});
module.exports = { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory };
