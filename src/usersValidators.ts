import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

function convertValidationError(error: Joi.ValidationError): { [key: string]: string } {
  return error.details.reduce((pv, cv) => ({ ...pv, [cv.path[0]]: cv.message }), {});
}

const newUserSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    login: Joi.string().required().messages({
      'any.required': 'Login field is required',
    }),
    password: Joi.string()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
        'any.required': 'Password field is required',
      }),
    age: Joi.number().integer().min(4).max(130).required().messages({
      'number.min': 'Age field must be between 4 and 130',
      'number.max': 'Age field must be between 4 and 130',
      'any.required': 'Age field is required',
    }),
  });

export function validateNewUser(req: Request, res: Response, next: NextFunction) {
  const result = newUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(convertValidationError(result.error));
  }

  return next();
}

const updateUserSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    login: Joi.string().optional(),
    password: Joi.string()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .optional()
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
      }),
    age: Joi.number().integer().min(4).max(130).optional().messages({
      'number.min': 'Age field must be between 4 and 130',
      'number.max': 'Age field must be between 4 and 130',
    }),
  });

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  const result = updateUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(convertValidationError(result.error));
  }

  return next();
}
