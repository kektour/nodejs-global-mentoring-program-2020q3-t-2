import app from './src/app';
import { EnvService, EnvServiceImpl } from './src/services/env';

const envService: EnvService = new EnvServiceImpl();
const port = envService.getVar('PORT');
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
