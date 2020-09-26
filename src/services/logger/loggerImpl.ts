import { createLogger, transports } from 'winston';
import { LoggerService } from './logger';

// enum Level {
//   Error,
//   Warn,
//   Info,
//   Http,
//   Verbose,
//   Debug,
//   Silly,
// }

const logger = createLogger({
  transports: [new transports.Console({})],
});

export class LoggerServiceImpl implements LoggerService {
  public info(msg: string): void {
    logger.info(msg);
  }
  public error(msg: string): void {
    logger.error(msg);
  }
}
