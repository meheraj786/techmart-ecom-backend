const Subcategory =require('../models/subCategory.model')

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
