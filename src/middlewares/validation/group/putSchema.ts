import Joi from 'joi';
import { MessageKey } from '../messageKeys';
import { PermissionsMessage } from './messages';
import { Permission } from '../../../models/group';

const permissionArr = Object.values(Permission);

export default Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().optional(),
    permissions: Joi.array()
      .items(...permissionArr.map(() => Joi.string().valid(...permissionArr)))
      .optional()
      .messages({
        [MessageKey.ArrayIncludes]: PermissionsMessage.Includes,
      }),
  });
