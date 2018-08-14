const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

console.log(controllers);

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Todas rotas daqui para baixo utilizam autenticação
 */
routes.use(authMiddleware);

routes.get('/tweets', (req, res) => {
  console.log(req.userId);

  res.send('OK');
});

/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routes;
