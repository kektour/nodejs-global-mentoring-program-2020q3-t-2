export type UUIDVersion = 'V1' | 'V4';

export interface UtilsService {
  getEnvVar(value: string): string;
  getUUID(version?: UUIDVersion): string;
}
