export const QuestionSchema = `
    type Question {
        _id: ID
        question: String
        ans: String
        type: String
    }

    type Response {
        msg: String!
    }

    input QuestionInput {
        question: String
        ans: String
        type: String
    }
`;
