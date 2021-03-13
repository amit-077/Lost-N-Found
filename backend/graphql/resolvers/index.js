import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from './user.js';

import {
  addApplicationItems,
  getApplicationById,
  getMyApplications,
  getApplications,
} from './application.js';

import {
  createProduct,
  getProducts,
  getProductByCategory,
  getProductBySubCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductQs,
} from './products.js';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from './category.js';

import { filterProducts } from './productFilter.js';

import { searchProduct } from './search.js';

export default {
  //users
  authUser: authUser,
  registerUser: registerUser,
  getUserProfile: getUserProfile,
  updateUserProfile: updateUserProfile,
  getUsers: getUsers,
  deleteUser: deleteUser,
  getUserById: getUserById,
  updateUser: updateUser,
  //categories
  createCategory: createCategory,
  getCategories: getCategories,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  //subcategories
  createSubCategory: createSubCategory,
  getSubCategories: getSubCategories,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  //products
  createProduct: createProduct,
  getProducts: getProducts,
  getProductByCategory: getProductByCategory,
  getProductBySubCategory: getProductBySubCategory,
  getProductById: getProductById,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProductQs: getProductQs,
  //orders
  orders: getApplications,
  myorders: getMyApplications,
  orderById: getApplicationById,
  createApplication: addApplicationItems,
  //search
  searchProduct: searchProduct,
  //filterProducts
  filterProducts: filterProducts,
};
