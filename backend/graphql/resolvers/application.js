import Application from '../../models/applicationModel.js';
import { loggedin, admin } from '../../utils/verifyUser.js';

// PS: After .save(), user & product are not populated and can't be queried via graphql

// Create new application
// Private
const addApplicationItems = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const application = new Application({
        user: req.user._id,
        product: args.applicationInput.product,
        isReturned: args.applicationInput.isReturned,
      });

      if (args.applicationInput.returnedAt) {
        application.returnedAt = new Date(args.applicationInput.returnedAt);
      }

      const res = await application.save();
      return res;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get application by ID
// Private
const getApplicationById = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const application = await Application.findById(
        args.applicationId
      ).populate('user product');

      if (application && application._id === req.user._id) {
        return application;
      } else {
        throw new Error('Application not found!!');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update application to returned
// Private/Admin
const updateApplicationToReturned = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const application = await Application.findById(args.applicationId);

      if (application) {
        application.isReturned = true;
        application.returnedAt = Date.now();

        const updatedApplication = await application.save();
        return updatedApplication;
      } else {
        throw new Error('Application not found!!');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get logged in user applications
// Private
const getMyApplications = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const applications = await Application.find({
        user: req.user._id,
      }).populate('user product');

      return applications.map((application) => {
        return {
          ...application._doc,
          // Here try/catch maybe?
          returnedAt:
            application._doc.returnedAt != null
              ? application._doc.returnedAt.toISOString()
              : null,
          paidAt:
            application._doc.paidAt != null
              ? application._doc.paidAt.toISOString()
              : null,
        };
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all applications
// Private/Admin
const getApplications = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const applications = await Application.find({}).populate('user product');

      return applications.map((application) => {
        return {
          ...application._doc,
          // Here try/catch maybe?
          returnedAt:
            application._doc.returnedAt != null
              ? application._doc.returnedAt.toISOString()
              : null,
          paidAt:
            application._doc.paidAt != null
              ? application._doc.paidAt.toISOString()
              : null,
        };
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  addApplicationItems,
  getApplicationById,
  updateApplicationToReturned,
  getMyApplications,
  getApplications,
};
