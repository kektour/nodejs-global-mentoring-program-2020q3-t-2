import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { AgeMessage, PasswordMessage } from './messages';

export default Joi.object()
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
