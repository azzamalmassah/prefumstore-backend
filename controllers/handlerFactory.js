import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { apiFeatuers } from "../utils/apiFeatuers.js";
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No Document found with this ID", 404));
    }
    res.status(204).json({
      success: true,
      data: null,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No  Document found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        data: doc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError("No item found with this ID", 404));
    }
    res.status(200).json({
      success: true,
      data: {
        doc,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.itemId) filter = { item: req.params.itemId };
    const defaults = res.locals.aliasQuery || {};
    const effectiveQuery = { ...defaults, ...(req.query || {}) };
    //EXECUTE QUERY
    const features = new apiFeatuers(Model.find(), effectiveQuery)
      .filter()
      .sorting()
      .limiting()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      success: true,
      length: doc.length,
      data: {
        data: doc,
      },
    });
  });
