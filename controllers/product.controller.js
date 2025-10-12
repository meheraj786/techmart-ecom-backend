const Product = require("../models/products.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const uploadOnCloudinary = require("../utils/cloudinary");
const express=require("express")
const path = require("path");

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

    const { name, description, price, discount, stock, category, subcategory } =
      req.body;

    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
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

    res
      .status(201)
      .json(new ApiResponse(product, "Product created successfully!"));
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json(new ApiError(error.message));
  }
};

exports.allProducts = async (_, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ name: 1 });

    if (!products || products.length === 0) {
      return res.status(404).json(new ApiError("No products found"));
    }

    res
      .status(200)
      .json(new ApiResponse(products, "All products fetched successfully"));
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json(new ApiError(error.message));
  }
};
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) {
      return res.status(404).json(new ApiError("Product not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(product, "Product fetched successfully"));
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json(new ApiError(error.message));
  }
};
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json(new ApiError("Product not found"));
    }

    let image = existingProduct.image;
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) image = cloudinaryResponse.secure_url;
    }

    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image,
    };

    console.log(updatedData);

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("category", "name")
      .populate("subcategory", "name");

    res
      .status(200)
      .json(new ApiResponse(updatedProduct, "Product updated successfully!"));
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json(new ApiError(error.message));
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json(new ApiError("Product not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(product, "Product deleted successfully!"));
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json(new ApiError(error.message));
  }
};

exports.imageLive = async (req, res) => {
  try {
    const localFilePath = req.file?.path;
    if (!localFilePath) return res.status(400).send("No file uploaded");

    const fileName = path.basename(localFilePath);
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
