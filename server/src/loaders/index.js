import expressLoader from './express';
import Logger from '../base/logger';

export default async ({ expressApp }) => {
  expressLoader({ app: expressApp });
  
  Logger.info('✌️ Express loaded');
};
