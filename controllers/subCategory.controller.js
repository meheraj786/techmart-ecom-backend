const Subcategory =require('../models/Subcategory.model');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');

exports.createSubCategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const existingCat = await Subcategory.findOne({ name });
    if (existingCat) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    const newSubCategory = new Subcategory({ name, description, category });
    const savedCat = await newSubCategory.save();

    res.status(201).json({
      message: "Subcategory successfully created",
      data: savedCat,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    const allCategories= await Subcategory.find({}).populate("category")
    res.status(201).json(new ApiResponse(allCategories))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.getSingleSubCategory = async (req, res) => {
  try {
    const {id}=req.params
    const subCategory= await Subcategory.findOne({_id:id}).populate("category")
    res.status(201).json(new ApiResponse(subCategory))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.updateSingleSubCategory = async (req, res) => {
  try {
    const {id}=req.params
    const {name, description}=req.body
    const subCategory= await Subcategory.findOneAndUpdate({_id:id},{name, description}, {new: true}).populate("category")
    res.status(201).json(new ApiResponse(subCategory))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
exports.deleteSingleSubCategory = async (req, res) => {
  try {
    const {id}=req.params
    const subCategory= await Subcategory.findOneAndDelete({_id:id}).populate("category")
    res.status(201).json(new ApiResponse(subCategory))
  } catch (error) {
    res.json(new ApiError(400))
  }
};
