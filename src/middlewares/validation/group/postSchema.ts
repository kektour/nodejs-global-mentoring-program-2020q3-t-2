import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { NameMessage, PermissionsMessage } from './messages';
import { Permission } from '../../../models/group';

const permissionArr = Object.values(Permission);

export default Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .required()
      .messages({
        [MessageKey.AnyRequired]: NameMessage.Required,
      }),
    permissions: Joi.array()
      .items(...permissionArr.map(() => Joi.string().valid(...permissionArr)))
      .required()
      .messages({
        [MessageKey.AnyRequired]: PermissionsMessage.Required,
        [MessageKey.ArrayIncludes]: PermissionsMessage.Includes,
      }),
  });
