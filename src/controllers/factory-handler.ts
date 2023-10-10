import { Request, Response } from "express";
import { NotFoundError } from "../errors";
import { Document, Model, Models } from "mongoose";
import { features } from "../lib/features";

/**
 *
 * @desc    create document
 */
export const createOne =
  (document: Model<any>) => async (req: Request, res: Response) => {
    console.log("req.files", req.files);
    const newCategory = await document.create(req.body);
    res.status(201).json(newCategory);
  };

/**
 *
 * @desc    get all documents
 */
export const getAll =
  (document: Model<any>, searchItem?: string) =>
  async (req: Request, res: Response) => {
    const documentCount = await document.countDocuments();
    const Features = new features(document.find({}), req.query)
      .search(searchItem ?? "")
      .sort()
      .selectFields()
      .filterByPrice()
      .pagenation(documentCount);
    const { mongooseQuery, pageResulte } = Features;
    let documents = await mongooseQuery;
    res.status(200).json({ documents, pageResulte });
  };

/**
 *
 * @desc    get one documents
 */
export const getOne =
  (document: Model<any>) => async (req: Request, res: Response) => {
    const { id } = req.params;
    const doc = await document.findById(id);
    if (!doc) {
      throw new NotFoundError(`no document found with id=${id}`);
    }
    res.status(200).json(doc);
  };

/**
 *
 * @desc    update document
 */
export const updateOne =
  (document: Model<any>) => async (req: Request, res: Response) => {
    const { id } = req.params;
    const doc = await document.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!doc) {
      throw new NotFoundError(`no document found with this id=${id}`);
    }
    res.status(200).json(doc);
  };

/**
 *
 * @desc    delete document
 */
export const deleteOne =
  (document: Model<any>) => async (req: Request, res: Response) => {
    const { id } = req.params;
    const doc = await document.findByIdAndDelete(id);
    if (!doc) {
      throw new NotFoundError(`no document found with this id=${id}`);
    }
    res.status(200).json({ message: "document is deleted succeffully!" });
  };
