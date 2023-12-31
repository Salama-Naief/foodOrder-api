import { Model } from "mongoose";

interface PagenationInterface {
  limit: number;
  currnetPage: number;
  numberOfPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

const initialConst = {
  limit: 0,
  currnetPage: 0,
  nextPage: null,
  numberOfPages: 0,
  prevPage: null,
};
export default class ApiFeatures {
  queryString: any;
  mongooseQuery: any;
  pageResulte: PagenationInterface;

  constructor(mongooseQuery: any, queryString: object) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.pageResulte = initialConst;
  }

  //@desc apply filter
  filter() {
    const queryObj = { ...this.queryString };
    const presariveFields = ["page", "limit", "sort", "search", "fields"];
    presariveFields.forEach((field) => delete queryObj[field]);
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|le)\b/g,
      (match) => `$${match}`
    );
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }
  //@desc apply sort
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  //@desc apply limit fields
  limitFields() {
    if (this.queryString.fields) {
      const selectFields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(selectFields);
    }
    return this;
  }

  //@desc apply search
  search(documentName: string) {
    if (this.queryString.search) {
      let searchQuery: any = {};
      if (documentName === "Products") {
        searchQuery.$or = [
          { title: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ];
      } else {
        searchQuery = {
          title: { $regex: this.queryString.search, $options: "i" },
        };
      }
      this.mongooseQuery = this.mongooseQuery.find(searchQuery);
    }
    return this;
  }

  //@desc apply pagination
  pagenate(documentCount: number) {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 20;
    const skip = (page - 1) * limit;
    const lastPageIndex = page * limit;

    //@desc pagenation resulte
    const pagenationResulte: PagenationInterface = initialConst;
    pagenationResulte.currnetPage = parseInt(page);
    pagenationResulte.limit = parseInt(limit);
    pagenationResulte.numberOfPages = Math.ceil(documentCount / limit);
    pagenationResulte.nextPage =
      documentCount > lastPageIndex ? parseInt(page) + 1 : null;
    pagenationResulte.prevPage = skip > 0 ? parseInt(page) - 1 : null;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.pageResulte = pagenationResulte;
    return this;
  }

  //@desc apply populate of category for product documents
  populateCategory() {
    this.mongooseQuery = this.mongooseQuery.populate({
      path: "category",
      select: "title",
    });
    return this;
  }
}
