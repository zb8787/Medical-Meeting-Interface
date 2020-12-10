require('dotenv').config();
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const UserModel = require('../models/users');

const bcrypt = require('bcryptjs');

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { username, category, admin } = req.body;

        if (password.length < 7) {
          return done(null, false, { message: `${ password } is less than 7 characters.` });
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        let user;

        if (admin !== null) {
          user = await UserModel.create({username, email, password, category, admin});
        } else {
          user = await UserModel.create({username, email, password, category});
        }

        return done(null, user);
      } catch (e) {
        done(e);
      }
    })
);

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (e) {
        done(e);
      }
    }
  ),
);

passport.use(
  'jwt',
  new JWTStrategy(
    { secretOrKey: process.env.SECRETKEY, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() },
    async (jwt_payload, done) => {
      try {
        UserModel.findOne({ _id: jwt_payload.user._id }, (error, user) => {
          if (error) {
            return done(error, false, { message: 'Please authenticate' });
          }
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: 'Please authenticate' });
        });
      } catch (e) {
        done(e);
      }
    })
);