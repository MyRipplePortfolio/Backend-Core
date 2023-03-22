const errorMiddleware = (error, req, res, next) => {
    res.status(500).send({error: 'Internal server error'});
  };
  
  module.exports = errorMiddleware;