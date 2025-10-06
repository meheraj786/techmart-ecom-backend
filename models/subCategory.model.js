const mongoose = require("mongoose");
const Category = require("./category.model");

const subcategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

subcategorySchema.pre("save", async function (next) {
  try {
    const doc = this;

    const category = await Category.findById(doc.category);
    if (!category) return next(new Error("Category not found"));

    const exists = category.subcategory.some(
      (id) => id.toString() === doc._id?.toString()
    );

    if (!exists) {
      await Category.findByIdAndUpdate(doc.category, {
        $push: { subcategory: doc._id },
      });
    }
    next();
  } catch (err) {
    console.error("Error updating category subcategory list:", err);
    next(err);
  }
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
