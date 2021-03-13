import Product from '../../models/productModel.js';

// Ignore results with confidence score less than 7
// Populate category and brand once implemented
export const searchProduct = async (args, { req, redis }) => {
  const prods = await Product.fuzzySearch(args.searchTerm).populate(
    'user brand category subcategory'
  );

  return prods.filter((prod) => prod._doc.confidenceScore > 7);
};
