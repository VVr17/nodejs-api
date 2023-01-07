import { getCollections } from '../db/connection.js';

const modelsMiddleware = (req, res, next) => {
  const collections = getCollections();
  req.db = { ...collections };

  next();
};

export default modelsMiddleware;
