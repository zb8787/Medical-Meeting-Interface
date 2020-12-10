const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/users');
const LabelModel = require('../models/labels');

router.get(
  '/',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        /**
         * get labels,
         * filter by admin doctor/patient
         * according to user category
         */
        const userSatisfied = await UserModel.findOne({ category: user.category, admin: true });
        const labels = await LabelModel.find({ owner: userSatisfied._id });
        const data = [];
        labels.forEach((label) => {
          const { _id, category, description, completed } = label;
          data.push({ _id, category, description, completed });
        });

        return res.json({ data });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.post(
  '/',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        const { description, completed } = req.body;
        const owner = user._id;

        let label;

        if (user.admin) {
          const { category } = req.body;
          console.log(category);
          label = await LabelModel.create({ description, completed, category, owner });
        } else {
          label = await LabelModel.create({ description, completed, owner });
        }

        res.statusCode = 201;
        return res.json({
          message: 'Created Successfully',
          label,
        });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.put(
  '/:labelId',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        const { labelId } = req.params;
        // you need verify if the label matched user, or data will be destroy by mistake!!!
        const label = await LabelModel.findById(labelId);
        if (user._id === label.owner) {
          const {completed} = req.body; // only can change its 'completed' value, or create a new label.
          await LabelModel.findByIdAndUpdate(labelId, {completed});
        } else {
          res.status(403);
          return res.json({ error: 'You have no permission to modify this label, because it is not your label' });
        }
        const updatedLabel = await LabelModel.findById(labelId);

        return res.json({ label: updatedLabel });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.delete(
  '/:labelId',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        const { labelId } = req.params;
        // you need verify if the label matched user, or data will be destroy by mistake!!!
        const label = await LabelModel.findById(labelId);
        if (!label) {
          res.status(404);
          return res.json({ error: 'you do not have this label!' });
        }
        console.log(user._id.equals(label.owner));
        if (user._id.equals(label.owner)) {
          await LabelModel.findByIdAndDelete(labelId);
        } else {
          res.status(403);
          return res.json({ error: 'You have no permission to delete this label, because it is not your label' });
        }

        return res.json({ label });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

module.exports = router;