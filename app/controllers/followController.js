const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      // Buscar usuario que quero seguir
      // VOu precisar da info de following e followers
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: "Userd doesn't exists" });
      }

      // Verificar se já não estou seguindo esse usuario
      if (user.followers.indexOf(req.userId) !== -1) {
        return res.status(400).json({ error: `You're already following ${user.username}` });
      }

      user.followers.push(req.userId);
      await user.save();

      const me = await User.findById(req.userId);
      me.following.push(user.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      // Buscar usuario que quero seguir
      // VOu precisar da info de following e followers
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: "Userd doesn't exists" });
      }

      const following = user.followers.indexOf(req.userId);

      // Verificar se já não estou seguindo esse usuario
      if (following === -1) {
        return res.status(400).json({ error: `You're not following ${user.username}` });
      }

      user.followers.splice(following, 1);
      await user.save();

      const me = await User.findById(req.userId);
      me.following.splice(me.following.indexOf(user.id, 1));
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
};
