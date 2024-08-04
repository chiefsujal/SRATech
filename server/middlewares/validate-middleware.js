const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      return next();
    } catch (err) {
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.errors[0].message;
  
      const error = {
        status,
        message,
        extraDetails,
      };
  
      next(error);
    }
  };
  
  module.exports = validate;

  // await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.
