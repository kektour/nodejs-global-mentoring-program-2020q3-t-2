import app from './src/app';
import { UtilsService, UtilsServiceImpl } from './src/services/utils';

const utilsService: UtilsService = new UtilsServiceImpl();
const port = utilsService.getEnvVar('PORT');
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
