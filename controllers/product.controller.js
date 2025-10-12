
const Product = require("../models/products.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const uploadOnCloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const image = cloudinaryResponse.secure_url;

    const { name, description, price, discount, stock, category, subcategory } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      category,
      subcategory,
      image,
    });

    res.status(201).json(new ApiResponse(product, "Product created successfully!"))
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json(new ApiError());
  }
};
