export interface IConfig {
  port: number;
  debugLogging: boolean;
  facebookClientId: string;
  facebookClientSecret: string;
  sessionSecretKey: string;
  baseApiUrl: string;
}

const portNumber: number = Number(process.env.PORT) || 3000;

const config: IConfig = {
  port: portNumber,
  debugLogging: process.env.NODE_ENV === 'development',
  facebookClientId: process.env.FB_ID || 'sample-facebook-app-id',
  facebookClientSecret: process.env.FB_SECRET || 'sample-facebook-app-secret',
  sessionSecretKey: process.env.SESSION_SECRET_KEY || 'sample-session-secret-key',
  baseApiUrl: process.env.BASE_API_URL || `http://127.0.0.1:${portNumber}`,
};

export { config };
