import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Schema, ValidationError } from 'joi';

type Value = 'query' | 'body';
type Converter = (vr: ValidationError) => { [key: string]: string };

function errorResponse(error: ValidationError): { [key: string]: string } {
  return error.details.reduce((pv, cv) => ({ ...pv, [cv.path[0]]: cv.message }), {});
}

export default function (schema: Schema, value: Value, converter: Converter = errorResponse): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.validate(req[value], { abortEarly: false, allowUnknown: false });
    if (result.error) {
      return res.status(400).json(converter(result.error));
    }
    return next();
  };
}
