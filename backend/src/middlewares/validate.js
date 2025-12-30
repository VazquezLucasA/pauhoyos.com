const validate =
  (schema) =>
  (req, res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      req.validated = parsed;
      next();
    } catch (err) {
      err.status = 400;
      err.message = "Datos inválidos";
      err.details = err.errors || err.issues;
      next(err);
    }
  };

module.exports = { validate };
