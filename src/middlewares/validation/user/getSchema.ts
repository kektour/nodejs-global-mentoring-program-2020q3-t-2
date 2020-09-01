import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { LimitMessage, LoginMessage, PageMessage } from './messages';

export default Joi.object().keys({
  login: Joi.string()
    .optional()
    .messages({
      [MessageKey.AnyRequired]: LoginMessage.Required,
    }),
  limit: Joi.number()
    .integer()
    .optional()
    .messages({
      [MessageKey.Number]: LimitMessage.Number,
      [MessageKey.NumberInteger]: LimitMessage.Integer,
    }),
  page: Joi.number()
    .integer()
    .optional()
    .messages({
      [MessageKey.Number]: PageMessage.Number,
      [MessageKey.NumberInteger]: PageMessage.Integer,
    }),
});
