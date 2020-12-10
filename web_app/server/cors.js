const cors = require('cors');

const whitelist = [
  'http://localhost:3000', // backend
  'http://localhost:8080', // frontend
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  // console.log(req.header('Origin'));
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);