import dotenv from 'dotenv';
import users from './data/users.js';
import categories from './data/categories.js';
import products from './data/products.js';
import subCategories from './data/subcategories.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Application from './models/applicationModel.js';
import Category from './models/categoryModel.js';
import SubCategory from './models/subcategoryModel.js';
import Brand from './models/brandModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Brand.deleteMany();
    await SubCategory.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Application.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCategory = await Category.insertMany(categories);

    const adminUser = createdUsers[0]._id;

    const sampleSubCategories = await Promise.all(
      subCategories.map(async (subCategory) => {
        const subCategoryCategory = await Category.find({
          name: subCategory.category,
        });

        return {
          ...subCategory,
          category: subCategoryCategory[0]._id,
        };
      })
    );

    await SubCategory.insertMany(sampleSubCategories);

    const sampleProducts = await Promise.all(
      products.map(async (product) => {
        const productCategory = await Category.find({
          name: product.category,
        });

        const productSubCategory = await SubCategory.find({
          name: product.subcategory,
          category: productCategory[0]._id,
        });

        const newBrand = new Brand({
          name: product.brand,
        });

        const productBrand = await newBrand.save();
        return {
          ...product,
          user: adminUser,
          category: productCategory[0]._id,
          subcategory: productSubCategory[0]._id,
          brand: productBrand._id,
        };
      })
    );

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Brand.deleteMany();
    await SubCategory.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Application.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
