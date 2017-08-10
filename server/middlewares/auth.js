import jwt from 'jsonwebtoken';

export default function jwtMiddleware(app) {
  return (req, res, next) => {
    // Let's request token
    const token = req.body.token || req.query.token || req.headers['x-token'];

    // if token not found, what?
    if (!token) {
      return res.status(403).send({ error: 'Unauthorised user' });
    }

    // Token verification
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }

      req.auth = decoded;
      next();
    });
  };
}
