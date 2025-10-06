const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    subcategory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      default: undefined
    }]
  },
  {
    minimize: true
  }
);

categorySchema.pre('save', function(next) {
  if (this.subcategory.length === 0) {
    this.subcategory = undefined;
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;