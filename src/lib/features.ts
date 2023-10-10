import { stringify } from "querystring";

interface PagenationInterface {
  limit: number;
  currnetPage: number;
  numberOfPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export class features {
  mongooseQuery: any;
  queryString: any;
  pageResulte: any;
  constructor(mongooseQuery: any, queryString: any) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  //handle search
  search(searchItem: string) {
    if (this.queryString.search) {
      console.log("queryString", this.queryString);
      const search: { $or: {}[] } = { $or: [] };
      if (searchItem === "product") {
        search.$or = [
          { title: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ];
      } else {
        search.$or = [
          { name: { $regex: this.queryString.search, $options: "i" } },
        ];
      }

      this.mongooseQuery = this.mongooseQuery.find(search);
    }
    return this;
  }

  //handle sort
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createdAt");
    }
    return this;
  }
  //select fields
  selectFields() {
    if (this.queryString.fields) {
      const fieldsElement = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fieldsElement);
    }
    return this;
  }
  //filter by price
  filterByPrice() {
    if (this.queryString.price) {
      const priceElememtArr = this.queryString.price
        .split(",")
        .map((item: string) => {
          const items = item
            .replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
            .split("-");
          return items;
        });
      const priceFilter = { price: Object.fromEntries(priceElememtArr) };
      this.mongooseQuery = this.mongooseQuery.find(priceFilter);
    }
    return this;
  }

  //handle pagenation
  pagenation(documentCount: number) {
    const pageQuery = this.queryString.page || 1;
    const limitQuery = this.queryString.limit || 20;
    const skip = (this.queryString.page - 1) * this.queryString.limit;
    const lastPageIndex = this.queryString.page * this.queryString.limit;

    const pagenationResulte: PagenationInterface = {
      currnetPage: 0,
      limit: 20,
      nextPage: null,
      prevPage: null,
      numberOfPages: 1,
    };
    //@desc pagenation resulte

    pagenationResulte.currnetPage = parseInt(pageQuery);
    pagenationResulte.limit = parseInt(limitQuery);
    pagenationResulte.numberOfPages = Math.ceil(documentCount / limitQuery);
    pagenationResulte.nextPage =
      documentCount > lastPageIndex ? parseInt(pageQuery) + 1 : null;
    pagenationResulte.prevPage = skip > 0 ? parseInt(pageQuery) - 1 : null;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limitQuery);
    this.pageResulte = pagenationResulte;
    return this;
  }
}
