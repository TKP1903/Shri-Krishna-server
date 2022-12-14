const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const miscRoute = require('./misc.route');
const docsRoute = require('./docs.route');
const doodRoute = require('./dood.route');
const videoRoute = require('./video.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/misc',
    route: miscRoute,
  },
  {
    path: '/dood',
    route: doodRoute,
  },
  {
    path: '/videos',
    route: videoRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// http://43.205.236.93/.well-known/pki-validation/233127A19A0B1DEC4959479ADC9966AC.txt

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
