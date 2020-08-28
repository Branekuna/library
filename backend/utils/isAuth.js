const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodeToken = jwt.verify(token, 'secretSauce');
  } catch (err) {
    throw new Error(`Error verifying token : ${err}`);
  }
  if (!decodedToken) {
    throw new Error(`No decoded token `);
  }
  req.userId = decodedToken.id;
  next();
};
