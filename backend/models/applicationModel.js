import mongoose from 'mongoose';

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

const applicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
