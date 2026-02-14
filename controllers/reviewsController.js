import Reviews from "../models/reviewModel.js";

export const getAll = async (req, res, next) => {
  const reviews = await Reviews.find();

  res.status(200).json({
    success: true,
    data: {
      reviews,
    },
  });
};

export const setItemUserIds = (req, res, next) => {
  if (!req.body.item) req.body.item = req.params.itemId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
export const createReview = async (req, res, next) => {
  if (!req.body.item) req.body.item = req.params.itemId;
  if (!req.body.user) req.body.user = req.user.id;
  const review = await Reviews.create({
    rating: req.body.rating,
    review: req.body.review,
    user: req.body.user,
    item: req.body.item,
  });
  res.status(201).json({
    success: true,
    data: {
      review,
    },
  });
};
