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
 * Users
 */
routes.put('/users', controllers.userController.update);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * Like
 */
routes.post('/like/:id', controllers.likeController.toggle);

module.exports = routes;
