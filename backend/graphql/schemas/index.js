import { buildSchema } from 'graphql';
import { UserSchema } from './user.js';
import { CategorySchema } from './category.js';
import { ProductSchema } from './product.js';
import { ApplicationSchema } from './application.js';
import { QuestionSchema } from './question.js';
import { ProductFilterSchema } from './productFilter.js';

export default buildSchema(`
    ${UserSchema}

    ${QuestionSchema}

    ${CategorySchema}

    ${ProductSchema}

    ${ApplicationSchema}

    ${ProductFilterSchema}

    type rootQuery {
        Applications: [Application!]!
        myApplications: [Application!]!
        ApplicationById(applicationId: ID!): Application!
        
        getCategories: [Category!]!
        
        getSubCategories(categoryId: ID!): [SubCategory!]!
        
        authUser(email: String!, password: String!): User!
        getUserProfile: User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!
        
        getProducts: [Product!]!
        getProductByCategory(categoryId: ID!): [Product!]!
        getProductBySubCategory(subCategoryId: ID!): [Product!]!
        getProductById(id: ID!): [Product!]!
        deleteProduct(id: ID!): Product!
        getProductQs(productId: ID!): [Question]
        
        searchProduct(searchTerm: String!): [Product!]!
        filterProducts(searchTerm: String!, filters: FilterInput): [Product!]!
    }

    type rootMutation {
        createApplication(applicationInput: ApplicationInput): Application!
        updateApplicationToReturned(applicationId: ID!): Application!

        createCategory(name: String!): Category!
        updateCategory(name: String!, newName: String!): Response!
        deleteCategory(name: String!): Response!

        createSubCategory(name: String!, category: ID!): SubCategory!
        updateSubCategory(subCategoryId: ID!, name: String): Response!
        deleteSubCategory(subCategoryId: ID!): Response!

        registerUser(userInput: UserInput!): User!
        updateUserProfile(userInput: UpdateUserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): Response!

        createProduct(productInput: ProductInput):  Product!
        updateProduct(productId: ID!, updateProduct: updateProduct): Product!
    }

    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);
