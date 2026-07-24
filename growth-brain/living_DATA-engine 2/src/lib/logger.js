import winston from 'winston'
import path from 'path'
import { fileURLToPath } from 'url'
import { ElasticTransport } from './elasticTransport.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.json()),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.printf(({ timestamp, level, message, ...m }) => `${timestamp} [${level}] ${message}${Object.keys(m).length ? ' ' + JSON.stringify(m) : ''}`)) }),
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/pipeline.log'), maxsize: 10_000_000, maxFiles: 5 }),
    new winston.transports.File({ filename: path.join(__dirname, '../../logs/errors.log'), level: 'error' }),
    new ElasticTransport(),
  ],
})
