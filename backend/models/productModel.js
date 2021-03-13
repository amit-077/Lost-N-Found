import mongoose from 'mongoose';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';

const questionSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    ans: { type: String },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [],
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

// For geospatial processing
productSchema.index({ location: '2dsphere' });

productSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: 'name',
      minSize: 2,
      weight: 5,
    },
    {
      name: 'brand',
      keys: ['name'],
      minSize: 3,
      weight: 1,
      prefixOnly: true,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
