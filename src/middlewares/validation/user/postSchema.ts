import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { AgeMessage, LoginMessage, PasswordMessage } from './messages';

export default Joi.object()
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
