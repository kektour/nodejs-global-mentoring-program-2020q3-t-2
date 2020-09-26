import { NextFunction, Request, Response } from 'express';
import { LoggerService, LoggerServiceImpl } from '../services/logger';
import { UtilsService, UtilsServiceImpl } from '../services/utils';

const loggerService: LoggerService = new LoggerServiceImpl();
const utilsService: UtilsService = new UtilsServiceImpl();

export default function (req: Request, res: Response, next: NextFunction) {
  const log = utilsService.buildEndpointLog(
    req.method,
    req.path,
    req.params as Record<string, string>,
    req.query as Record<string, string>,
    req.body as Record<string, string>
  );
  loggerService.info(log);
  next();
}
