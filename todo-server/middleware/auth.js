module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
