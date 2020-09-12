import * as uuid from 'uuid';
import { UtilsService, UUIDVersion } from './utils';

export class UtilsServiceImpl implements UtilsService {
  public getEnvVar(value: string): string {
    const envVar = process.env[value];
    if (!envVar) {
      throw new Error(`Process env var missing: ${value}`);
    }
    return envVar;
  }

  public getUUID(version: UUIDVersion = 'V4'): string {
    switch (version) {
      case 'V1':
        return uuid.v1();
      case 'V4':
        return uuid.v4();
      default:
        throw new Error(`getUUID ${version} version is not implemented`);
    }
  }
}
