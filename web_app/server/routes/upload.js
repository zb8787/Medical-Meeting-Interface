const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const AudioModel = require('../models/audios');

/**
 * store audio files to server-side disk storage.
 */

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, './audio_files/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const audioFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(m4a|mp3|wav)$/)) {
    return cb(new Error('Just upload audio files !!!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: audioFileFilter,
});

router.post(
  '/',
  async (req, res, next) => {
    passport.authenticate(
      'jwt',
      {},
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.json({ error: info.message });
          }

          //TODO look here
          await upload.single('upload')(req, res, (err) => {
            if (err) {
              return next(err);
            }
          });

          await AudioModel.create({
            path: './audio_files/',
            owner: user,
          });

          res.json({ message: 'Upload Successfully' });
        } catch (e) {
          return next(e);
        }
      },
    )(req, res, next);
  }
);

module.exports = router;
