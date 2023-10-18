import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const registerUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().lowercase().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().email().lowercase().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
