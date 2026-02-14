import mongoose from "mongoose";
import ITEMS from "./itemsModel.js";

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, "please write your review"] },
    rating: {
      type: Number,
      default: 4.5,
      required: [true, "please write your rating"],
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must belong to a user"],
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "ITEMS",
      required: [true, "review must belong to an item"],
    },
  },
  { timestamps: true },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  }).populate({
    path: "item",
    select: "name brand",
  });
  next();
});
const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
