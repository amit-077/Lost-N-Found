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
        product:          ID!
        isReturned:       Boolean!
        returnedAt:       String
        questions:        [QuestionInput!]!
    }
`;
