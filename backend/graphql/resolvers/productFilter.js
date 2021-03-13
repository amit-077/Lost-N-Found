import Product from '../../models/productModel.js';

const filterProducts = async (args, { req, redis }) => {
  try {
    const { filters } = args;

    let result = [];
    let r1 = [],
      r2 = [],
      r3 = [];

    const prods = await Product.fuzzySearch(args.searchTerm).populate(
      'user brand category subcategory'
    );

    const relatedProds = prods.filter((prod) => prod.confidenceScore > 7);

    result = relatedProds;

    if (filters.brand) {
      const brandProds = result.filter((prod) => prod.brand === filters.brand);

      r1 = brandProds;
      result = r1;
    }
    if (filters.price) {
      const priceL = parseInt(filters.price.split('-')[0]);
      const priceH = parseInt(filters.price.split('-')[1]);

      const priceProds = result.filter(
        (prod) => prod.price >= priceL && prod.price <= priceH
      );

      r2 = priceProds;
      result = r2;
    }
    if (filters.rating) {
      const rateL = parseInt(filters.rating.split('-')[0]);
      const rateH = parseInt(filters.rating.split('-')[1]);

      const rateProds = result.filter(
        (prod) => prod.rating >= rateL && prod.rating <= rateH
      );

      r3 = rateProds;
      result = r3;
    }

    if (result.length < 5) {
      if (filters.brand && !filters.price && !filters.rating) {
        return r1;
      } else if (filters.brand && filters.price && filters.rating) {
        if (r2.length < 5) {
          return r1;
        } else {
          return r2;
        }
      } else if (!filters.brand && filters.price && filters.rating) {
        if (r2.length < 5) {
          return relatedProds;
        } else {
          return r2;
        }
      } else if (!filters.brand && !filters.price && filters.rating) {
        return relatedProds;
      } else if (!filters.brand && filters.price && !filters.rating) {
        return relatedProds;
      } else if (filters.brand && !filters.price && filters.rating) {
        return r1;
      } else if (filters.brand && filters.price && !filters.rating) {
        return r1;
      } else if (!filters.brand && !filters.price && !filters.rating) {
        return relatedProds;
      } else {
        return relatedProds;
      }
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export { filterProducts };
