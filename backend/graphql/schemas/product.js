export const ProductSchema = `
    type location {
        type: String!
        coordinates: [Float!]!
    }

    type Product {
        _id: ID!
        name: String!
        user: User!
        image: String!
        brand: Brand!
        category: Category!
        subcategory: SubCategory!
        questions: [Question!]!
        description: String!
        location: location!
    }

    input ProductInput {
        name: String!
        user: User!
        image: String!
        brand: Brand!
        category: Category!
        subcategory: SubCategory!
        questions: [Question!]!
        description: String!
        location: location!
    }

    input updateProduct {
        name: String!
        user: User!
        image: String!
        brand: Brand!
        category: Category!
        subcategory: SubCategory!
        questions: [Question!]!
        description: String!
        location: location!
    }
`;
