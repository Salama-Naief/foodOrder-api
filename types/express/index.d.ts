declare namespace Express {
  interface Request {
    files?: {
      cover?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };
  }
}
