export const ApplicationSchema = `
    type Application {
        _id:              ID!
        user:             User!
        product:          Product!
        isReturned:       Boolean!
        returnedAt:       String
        questions:        [Question!]!
    }
        
    input ApplicationInput {
        product:          Product!
        isReturned:       Boolean!
        returnedAt:       String
        questions:        [Question!]!
    }
`;
