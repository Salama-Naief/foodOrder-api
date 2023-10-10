import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import sharp from "sharp";
import productModel from "../models/product.model";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factory-handler";
import { uploadMixImage } from "../middelwares/upload-images.middleware";

/**
 * @desc upload images
 */
export const uploadImages = uploadMixImage();

/**
 * @desc resize images
 */
interface IRequest extends Request {
  files?: {
    cover?: Express.Multer.File[];
    images?: Express.Multer.File[];
  };
}
export const resizeImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files?.cover && req.files) {
    const coverImageName = `product-${uuidV4()}-${Date.now()}-cover.webp`;
    await sharp(req.files?.cover[0].buffer)
      .resize({ width: 2000, height: 1333, fit: "cover", background: "white" })
      .toFormat("webp")
      .webp({ quality: 95 })
      .toFile(`uploads/products/${coverImageName}`);
    req.body.cover = coverImageName;
  }
  //
  if (req.files?.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img: Express.Multer.File, index: number) => {
        const imageName = `product-${uuidV4()}-${Date.now()}-${index + 1}-${
          index + 1
        }.webp`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("webp")
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);
        // Save image into our db
        req.body.images.push(imageName);
      })
    );
  }
  next();
};

/**
 *
 * @desc    create new product
 * @route   POST/api/products
 * @role    admin-manager
 */
export const createProduct = createOne(productModel);

/**
 *
 * @desc    get products
 * @route   GET/api/products
 * @role    public
 */
export const getProducts = getAll(productModel, "product");

/**
 *
 * @desc    get product
 * @route   get/api/products/:id
 * @role    public
 */
export const getProduct = getOne(productModel);

/**
 *
 * @desc    update Product
 * @route   PUT/api/products/:id
 * @role    admin-manager
 */
export const updateProduct = updateOne(productModel);

/**
 *
 * @desc    delete Product
 * @route   DELETE/api/products/:id
 * @role    admin-manager
 */
export const deleteProduct = deleteOne(productModel);
