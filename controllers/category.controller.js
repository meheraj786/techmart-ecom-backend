const Category = require("../models/category.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingCat = await Category.findOne({ name });
    if (existingCat)
      return res.status(400).json({ message: "Category Already Exists" });
    const newCategory = await Category.create({ name, description });
    res.status(201).json({
      message: "Category Successfully Created",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategories= await Category.find({}).populate("subcategory")
    res.status(201).json(new ApiResponse(allCategories))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.getSingleCategory = async (req, res) => {
  try {
    const {id}=req.params
    const category= await Category.findOne({_id:id}).populate("subcategory")
    res.status(201).json(new ApiResponse(category))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.updateSingleCategory = async (req, res) => {
  try {
    const {id}=req.params
    const {name, description}=req.body
    const category= await Category.findOneAndUpdate({_id:id},{name, description}, {new: true}).populate("subcategory")
    res.status(201).json(new ApiResponse(category))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.deleteSingleCategory = async (req, res) => {
  try {
    const {id}=req.params
    const category= await Category.findOneAndDelete({_id:id}).populate("subcategory")
    res.status(201).json(new ApiResponse(category))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
