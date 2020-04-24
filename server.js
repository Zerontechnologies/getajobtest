import http from 'http';
import app from './app';
import config from './config/config';
import logger from './config/log4js';
import job_scheduler from './config/crons/job_scheduler';
import cronScheduler from './config/crons/cron_scheduler';

const port = process.env.PORT || config.port;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port);

logger.log("Listening on Port: " + port);

//job_scheduler.setUpJobScheduler();

//cronScheduler.scheduleAllJobs();