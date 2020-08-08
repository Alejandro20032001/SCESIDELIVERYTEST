import { config } from "dotenv";
config()
/**
 * env dev
 */
export const ENVIRONMENT = process.env.ENVIRONMENT || 'develop';
export const SECRET = process.env.SECRET || 'jwt secret token';
export const TIME = process.env.TIME || '60';
export const PORT = process.env.PORT || '9090';

/**
 * DB config
 */
export const SCHEMA = 'delivery'
export const URLDB = `mongodb://localhost/${SCHEMA}`