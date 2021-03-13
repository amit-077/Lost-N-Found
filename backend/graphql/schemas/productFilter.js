export const ProductFilterSchema = `
    input FilterInput {
        brand: String
        category: String
        subcategory: String
        location: locationInput
    }
`;
