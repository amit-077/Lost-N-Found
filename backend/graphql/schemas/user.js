export const UserSchema = `
    type User {
        _id: ID!
        name: String!
        phoneNo: String!
        email: String!
        password: String
        isAdmin: Boolean!
        token: String
    }

    input UserInput {
        name: String!
        phoneNo: String!
        email: String!
        password: String!
        isAdmin: Boolean
    }
    
    input UpdateUserInput {
        name: String
        phoneNo: String!
        email: String
        password: String
        isAdmin: Boolean
    }
`;
