export type UUIDVersion = 'V1' | 'V4';

export interface UtilsService {
  getEnvVar(value: string): string;
  getUUID(version?: UUIDVersion): string;
  buildEndpointLog(
    method: string,
    path: string,
    params: Record<string, string>,
    query: Record<string, string>,
    body: Record<string, string>
  ): string;
}
