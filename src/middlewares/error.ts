import { NextFunction, Request, Response } from 'express';
import { LoggerService, LoggerServiceImpl } from '../services/logger';
import { UtilsService, UtilsServiceImpl } from '../services/utils';

const loggerService: LoggerService = new LoggerServiceImpl();
const utilsService: UtilsService = new UtilsServiceImpl();

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  const status = 500;
  const message = 'Something went wrong';
  const log = utilsService.buildEndpointLog(
    req.method,
    req.path,
    req.params as Record<string, string>,
    req.query as Record<string, string>,
    req.body as Record<string, string>
  );
  loggerService.error(`${log} - ${err.message}`);
  res.status(status).json({
    status,
    message,
  });
}
