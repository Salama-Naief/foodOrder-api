import cuisineModel from "../models/cuisine.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factory-handler";

/**
 *
 * @desc    create new cuisine
 * @route   POST /api/cuisines
 * @role    admin-manager
 */
export const createCuisine = createOne(cuisineModel);

/**
 *
 * @desc    get cuisines
 * @route   GET /api/cuisines
 * @role    public
 */
export const getCuisines = getAll(cuisineModel);

/**
 *
 * @desc    get cuisine
 * @route   GET /api/cuisines/:id
 * @role    public
 */
export const getCuisine = getOne(cuisineModel);

/**
 *
 * @desc    update cuisine
 * @route   PUT /api/cuisines/:id
 * @role    admin-manager
 */
export const updateCuisine = updateOne(cuisineModel);

/**
 *
 * @desc    delete cuisine
 * @route   DELETE /api/cuisines/:id
 * @role    admin-manager
 */
export const deleteCuisine = deleteOne(cuisineModel);
