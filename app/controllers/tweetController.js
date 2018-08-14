const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  // Pegar as infos que são enviadas na requisicao HTTP
  // Criar um tweet com as infos
  async create(req, res, next) {
    try {
      const tweet = await Tweet.create({ ...req.body, user: req.userId });

      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      // Vai procurar um tweet por esse id que está vindo na rota e vai deleta-lo
      // Retorna erro senão achar aquele id
      // Retorna erro senão conseguir remover por qualquer motivo
      await Tweet.findByIdAndRemove(req.params.id);
      // Posso retornar send vazio ou o JSON vazio para ele dar um return com o status 200
      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
