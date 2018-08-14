const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {

  async toggle(req, res, next) {
    // Buscar tweet para ver se existe
    try {
      const tweet = await Tweet.findById(req.params.id);

      if (!tweet) {
        return res.status(400).json({ error: 'Tweet doesn\'t exists' });
      }

      // Verificar se o tweet já está como liked
      // Likes é um vetor com vários ids de usuarios dentro
      const liked = tweet.likes.indexOf(req.userId);
      // indexOf busca a posicao de um elemento dentro do vetor
      // req.userId é o usuário que está logado no momento
      // Verifica se o usuário que está logado no momento está neste vetor de likes do tweet

      // Verificar se ele nao recebeu like
      // Quando index of nao encontra esse elemento dentro do vetor ele retorna -1 como posicao
      // else trata se ele não estiver dentro do vetor
      if (liked === -1) {
        tweet.likes.push(req.userId);
      } else {
      // Método splice para remover um elemento dentro do vetor pela chave dele
      // IndexOf retorna a chave caso ele encontre-a
      // Segundo parametro fala que quero remover UM intem depois que encontro essa chave no vetor
        tweet.likes.splice(liked, 1);
      }

      await tweet.save();

      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },
};
