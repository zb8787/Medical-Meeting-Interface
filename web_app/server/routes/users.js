require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const UserModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.statusCode = 403;
  res.end('GET operation not supported on /users');
});

router.post(
  '/signup',
  async (req, res, next) => {
    passport.authenticate(
      'signup',
      { session: false },
      async (err, user, info) => {
        try {
          if (err) {
            res.statusCode = 400;
            res.send(err);
            return ;
          }

          if (!user) {
            res.statusCode = 400;
            return res.json({ message: info.message });
          }

          res.json({
            message: 'Signup Successfully',
            user: req.body
          });
        } catch (e) {
          return next(e);
        }
      }
    )(req, res, next);
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate('login', {},async (err, user, info) => {
      try {
        if (err) {
          const error = new Error(`An error occurred: ${err.message}`);
          return next(error);
        }

        if (!user) {
          const err = info.message;
          res.statusCode = 400;
          return res.json({ err });
        }

        req.logIn(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.SECRETKEY, { expiresIn: 3600 });
          const { username } = user;

          return res.json({ username, token });
        });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.get(
  '/profile',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        res.send(user);
        // return res.json(user);
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.get(
  '/logout',
  async (req, res, next) => {
    req.logout();
    res.redirect('/');
  }
);

router.put(
  '/profile',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        const { username } = req.body; // only can change username, or a new account will be created.

        if (username) { // you should not input nothing!!!
          const existedUser = await UserModel.findOne({username});

          if (existedUser !== null) {
            res.statusCode = 400;
            return res.json({error: 'Username existed!'});
          }

          await UserModel.findOneAndUpdate({_id: user._id}, {username});
          const updatedUser = await UserModel.findById(user._id);

          res.json({
            user: updatedUser,
          });
        } else {
          res.statusCode = 400;
          return res.json({ error: 'username is empty' });
        }
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

router.delete(
  '/profile',
  async (req, res, next) => {
    passport.authenticate('jwt', { }, async (err, user, info) => {
      if (err || !user) {
        res.statusCode = 400;
        return res.json({ error: info.message });
      }

      await UserModel.findByIdAndDelete(user._id);

      res.json({ user });
    })(req, res, next);
  }
);

router.post(
  '/feedback',
  async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          res.statusCode = 400;
          return res.json({ error: info.message });
        }

        /**
         * TODO #important
         * Use machine learning algorithm to convert user audio file to .txt file,
         * -----
         * Here?
         * Maybe!
         * -----
         */

        const labels = req.body;
        console.log(labels);
        const PATH = path.join(__dirname, '../text_files');
        // const PATH = 'server/text_files/output_script_example.txt';
        // PATH.split(/\\ /).join('\\ ');
        console.log(PATH);
        fs.readFile(`${PATH}/output_script_example.txt`, 'utf8', (error, data) => {
          if (error) {
            console.log(error);
            res.status(500);
            return res.json({ error: 'Read text file error!' });
          }
          console.log(data);
          labels.forEach((label) => {
            const { description } = label;
            if (data.includes(description)) {
              console.log(description);
              label.completed = true;
              console.log(label);
            }
          });

          return res.json({labels, content: data});
        });
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  }
);

module.exports = router;
