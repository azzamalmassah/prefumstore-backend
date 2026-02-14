import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A prefum must have a name"],
      unique: true,
      trim: true,
      maxlength: [30, "a prefum name must be less or equal to 40 charecters"],
      minlength: [10, "a prefum name must be more or equal to 10 charecters"],
    },
    brand: {
      type: String,
      required: [true, "A prefum must have a name"],
      trim: true,
      maxlength: [30, "a prefum Brand must be less or equal to 40 charecters"],
      minlength: [3, "a prefum Brand must be more or equal to 10 charecters"],
    },
    slug: { type: String },
    gender: {
      type: String,
      required: [true, "prefum must have a gender"],
      enum: {
        values: ["Unisex", "Women", "Men"],
        message: " gender can only be Men, Women or Unisex",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "a prefum description must be less or equal to 40 charecters",
      ],
      minlength: [
        20,
        "a prefum description must be more or equal to 10 charecters",
      ],
    },
    price: {
      type: Number,
      required: [true, "A Prefum must have a Price"],
    },
    sizes: {
      type: [String],
      required: [true, "A Prefum must have a sizes"],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, "rating can not be less than 1"],
      max: [5, "rating can not be more than 5"],
    },
    stock: {
      type: Number,
      default: 12,
      min: [1, "stock can not be less than 1"],
    },
    images: [String],
    components: [String],
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
itemsSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "item",
  localField: "_id",
});
const ITEMS = mongoose.model("ITEMS", itemsSchema);

export default ITEMS;
