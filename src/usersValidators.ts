import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

enum MessageKey {
  AnyRequired = 'any.required',
  StringPatternBase = 'string.pattern.base',
  NumberMin = 'number.min',
  NumberMax = 'number.max',
  NumberInteger = 'number.integer',
  Number = 'number.base',
}

enum LoginMessage {
  Required = 'Login field is required',
}

enum PasswordMessage {
  Pattern = 'Password must contain letters and numbers',
  Required = 'Password field is required',
}

enum AgeMessage {
  Number = 'Age must be number',
  Integer = 'Age must be integer',
  Min = 'Age field must be between 4 and 130',
  Max = 'Age field must be between 4 and 130',
  Required = 'Age field is required',
}

enum LimitMessage {
  Number = 'Limit must be number',
  Integer = 'Limit must be integer',
}

function extractMessages(error: Joi.ValidationError): { [field: string]: string } {
  return error.details.reduce((pv, cv) => ({ ...pv, [cv.path[0]]: cv.message }), {});
}

const newUserSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    login: Joi.string()
      .required()
      .messages({
        [MessageKey.AnyRequired]: LoginMessage.Required,
      }),
    password: Joi.string()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .required()
      .messages({
        [MessageKey.StringPatternBase]: PasswordMessage.Pattern,
        [MessageKey.AnyRequired]: PasswordMessage.Required,
      }),
    age: Joi.number()
      .integer()
      .min(4)
      .max(130)
      .required()
      .messages({
        [MessageKey.Number]: AgeMessage.Number,
        [MessageKey.NumberInteger]: AgeMessage.Integer,
        [MessageKey.NumberMin]: AgeMessage.Min,
        [MessageKey.NumberMax]: AgeMessage.Max,
        [MessageKey.AnyRequired]: AgeMessage.Required,
      }),
  });

export function validateNewUser(req: Request, res: Response, next: NextFunction) {
  const result = newUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(extractMessages(result.error));
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
        [MessageKey.StringPatternBase]: PasswordMessage.Pattern,
      }),
    age: Joi.number()
      .integer()
      .min(4)
      .max(130)
      .optional()
      .messages({
        [MessageKey.Number]: AgeMessage.Number,
        [MessageKey.NumberInteger]: AgeMessage.Integer,
        [MessageKey.NumberMin]: AgeMessage.Min,
        [MessageKey.NumberMax]: AgeMessage.Max,
      }),
  });

export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  const result = updateUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(extractMessages(result.error));
  }

  return next();
}

const getUserSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    login: Joi.string()
      .required()
      .messages({
        [MessageKey.AnyRequired]: LoginMessage.Required,
      }),
    limit: Joi.number()
      .integer()
      .optional()
      .default(10)
      .messages({
        [MessageKey.Number]: LimitMessage.Number,
        [MessageKey.NumberInteger]: LimitMessage.Integer,
      }),
  });

export function validateGetUser(req: Request, res: Response, next: NextFunction) {
  const result = getUserSchema.validate(req.query);
  if (result.error) {
    return res.status(400).json(extractMessages(result.error));
  }

  req.query = result.value;
  return next();
}
