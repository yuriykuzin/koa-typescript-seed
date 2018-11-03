export interface IConfig {
  port: number;
  debugLogging: boolean;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  debugLogging: process.env.NODE_ENV === 'development',
};

export { config };
