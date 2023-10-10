import reviewModel from "../models/review.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factory-handler";

/**
 *
 * @desc    create new review
 * @route   POST/api/reviews
 * @role    auth
 */
export const createReview = createOne(reviewModel);

/**
 *
 * @desc    get reviews
 * @route   GET/api/reviews
 * @role    admin-manager
 */
export const getReviews = getAll(reviewModel);

/**
 *
 * @desc    get Review
 * @route   get/api/reviews/:id
 * @role    public
 */
export const getReview = getOne(reviewModel);

// /**
//  *
//  * @desc    update Review
//  * @route   PUT/api/reviews/:id
//  * @role    user it self
//  */
// export const updateReview = updateOne(reviewModel);

/**
 *
 * @desc    delete Review
 * @route   DELETE/api/reviews/:id
 * @role    admin-manager-user it self
 */
export const deleteReview = deleteOne(reviewModel);
