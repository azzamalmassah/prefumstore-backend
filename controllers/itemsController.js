import Item from "../models/itemsModel.js";
import { apiFeatuers } from "../utils/apiFeatuers.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  getOne,
  updateOne,
  deleteOne,
  createOne,
  getAll,
} from "./handlerFactory.js";
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

export const getAllItems = getAll(Item);

export const createItem = createOne(Item);

export const deleteItem = deleteOne(Item);
export const updateItem = updateOne(Item);

export const getItem = getOne(Item, { path: "reviews" });
