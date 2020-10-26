import app from './src/app';
import { UtilsService, UtilsServiceImpl } from './src/services/utils';
import { LoggerService, LoggerServiceImpl } from './src/services/logger';
import { dbConnect } from './src/models';

const utilsService: UtilsService = new UtilsServiceImpl();
const loggerService: LoggerService = new LoggerServiceImpl();

dbConnect();
const port = utilsService.getEnvVar('PORT');
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

process.on('uncaughtException', (err) => {
  loggerService.error(`uncaughtException - ${err.message}`);
  process.exit(0);
});

process.on('unhandledRejection', () => {
  loggerService.error('unhandledRejection');
  process.exit(0);
});
