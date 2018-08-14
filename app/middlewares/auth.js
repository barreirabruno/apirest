const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Primeira verificacao que vou fazer é se o token existe
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Vou dividir esse token, ele vem como "Bearer XPTOPAHAUAHAUHU"
  // Vou dividi-lo em duas partes separadas por espaço
  const parts = authHeader.split(' ');
  // Agora eu devo ter um array em que a primeira posição é só escriro "Bearer"
  // E a segunda posição é escrito o meu token
  // ["Bearer", "XPTOUAOQUAOA"]
  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  // Agora eu vou usar a desestruturação para pegar o scheme e o token do meu parts
  const [scheme, token] = parts;

  // Verifica se o Scheme é diferente de Bearer, retorna status 401
  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token malformatted' });
  }
  // Se tudo o que está acima passou
  // Verifico se esse token é igual ao JWT gerado pela aplicacao

  // Promisify funcao do pacote util, que ja vem no node
  // Recebe uma funcao que tem esse padrao de callback e devolve uma funcao com o novo padrao
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    // Se ele conseguiu decodificar essa requisição vou dar um console.log nesse decoded
    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid ' });
  }
};
