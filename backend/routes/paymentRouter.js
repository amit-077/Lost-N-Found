import express from 'express';

import {
  getPaymentOrder,
  postPayment,
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter
  .route('/order')
  .get(getPaymentOrder);

paymentRouter
  .route('/capture/:paymentId')
  .post(postPayment);

export default paymentRouter;
