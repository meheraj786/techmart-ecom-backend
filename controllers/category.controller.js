const Category = require("../models/category.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingCat = await Category.findOne({ name });
    if (existingCat) return res.status(400).json({ message: "Category Already Exists" });
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
