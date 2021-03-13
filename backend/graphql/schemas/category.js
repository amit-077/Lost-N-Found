export const CategorySchema = `
    type Category {
        _id: ID!
        name: String!
    }

    type SubCategory {
        _id: ID!
        name: String!
        category: Category!
    }

    type Brand {
        _id: ID!
        name: String!
    }
  
`;
