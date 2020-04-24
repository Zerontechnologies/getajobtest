import kue from 'kue-scheduler';
import logger from './../log4js';
import mailer from './../mail/mailer';
import db from './../../db/database';
import Job from './../../models/job';
import User from './../../models/user';

let queue = kue.createQueue();

let job_scheduler = {
    setUpJobScheduler : function(){
        this.createJobForWeeklyJobMail()
    },
    
    createJobForWeeklyJobMail : function(){
        let job = queue
                    .createJob('job_updates')
                    .attempts(3)
                    .priority('normal');

        queue.every('0 0 6 * * WED', job);

        queue.process('job_updates', function(job, done){
            
            job_scheduler.processWeeklyJobUpdates();

            done();
        });

        logger.log('Weekly Job Mail Updates (JobScheduler) is setup');
    },

    processWeeklyJobUpdates : function(){
        let user = new User();
        db.query(user.getAllActiveCandidates(), (err, data) => {
            if(err){logger.log(err)}
            else{
                let candidates = data;

                for(let i = 0; i < candidates.length; i++){

                    candidates[i].full_name = candidates[i].first_name + ' ' + candidates[i].last_name;

                    let job = new Job();
                    db.query(job.get5RecommendedJobs(candidates[i].user_id), (err, data) => {
                        if(err){logger.log(err)}
                        else{
                            let jobs = data;

                            mailer.sendWeeklyJobUpdatesMail(jobs, candidates[i]);
                        }
                    });
                }
            }
        });
    }
}

module.exports = job_scheduler;