import ITEMS from "../models/itemsModel.js";
import { apiFeatuers } from "../utils/apiFeatuers.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
export const aliasTopTours = (req, res, next) => {
  res.locals.aliasQuery = {
    ...req.query,
    limit: "5",
    sort: "price",
    fields: "name,price,rating",
  };
  // req.query.limit = "5";
  // req.query.sort = "price";
  // req.query.fields = "name price";
  next();
};

export const getAllItems = catchAsync(async (req, res, next) => {
  const defaults = res.locals.aliasQuery || {};
  const effectiveQuery = { ...defaults, ...(req.query || {}) };
  const features = new apiFeatuers(ITEMS.find(), effectiveQuery)
    .filter()
    .sorting()
    .limiting()
    .paginate();
  const items = await features.query;
  res.status(200).json({
    success: true,
    length: items.length,
    data: {
      items,
    },
  });
});

export const createItem = catchAsync(async (req, res, next) => {
  const item = await ITEMS.create(req.body);
  res.status(200).json({
    success: true,
    data: {
      item,
    },
  });
});

export const deleteItem = catchAsync(async (req, res, next) => {
  const item = await ITEMS.findByIdAndDelete(req.params.id);
  if (!item) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    data: null,
  });
});

export const updateItem = catchAsync(async (req, res, next) => {
  const updatedItem = await ITEMS.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedItem) {
    return next(new AppError("No item found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      updatedItem,
    },
  });
});

export const getItem = catchAsync(async (req, res, next) => {
  const item = await ITEMS.findById(req.params.id);
  if (!item) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    data: {
      item,
    },
  });
});
