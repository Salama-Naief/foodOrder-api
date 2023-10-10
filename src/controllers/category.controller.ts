import categoryModel from "../models/category.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factory-handler";

/**
 *
 * @desc    create new category
 * @route   POST/api/categories
 * @role    admin-manager
 */
export const createCategory = createOne(categoryModel);

/**
 *
 * @desc    get categories
 * @route   GET/api/categories
 * @role    public
 */
export const getCategories = getAll(categoryModel);

/**
 *
 * @desc    get category
 * @route   get/api/categories/:id
 * @role    public
 */
export const getCategory = getOne(categoryModel);

/**
 *
 * @desc    update category
 * @route   PUT/api/categories/:id
 * @role    admin-manager
 */
export const updateCategory = updateOne(categoryModel);

/**
 *
 * @desc    delete category
 * @route   DELETE/api/categories/:id
 * @role    admin-manager
 */
export const deleteCategory = deleteOne(categoryModel);
