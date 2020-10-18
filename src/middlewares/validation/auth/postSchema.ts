import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { LoginMessage, PasswordMessage } from './messages';

export default Joi.object()
  .options({ abortEarly: false })
  .keys({
    login: Joi.string()
      .required()
      .messages({
        [MessageKey.AnyRequired]: LoginMessage.Required,
      }),
    password: Joi.string()
      .required()
      .messages({
        [MessageKey.AnyRequired]: PasswordMessage.Required,
      }),
  });
