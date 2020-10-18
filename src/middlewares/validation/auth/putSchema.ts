import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { RefreshTokenMessage } from './messages';

export default Joi.object()
  .options({ abortEarly: false })
  .keys({
    refreshToken: Joi.string()
      .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
      .required()
      .messages({
        [MessageKey.AnyRequired]: RefreshTokenMessage.Required,
      }),
  });
