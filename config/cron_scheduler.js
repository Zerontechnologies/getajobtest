import cron from 'node-cron';

let cronScheduler = {

    scheduleAllJobs : function(){
        this.scheduleShortlistJob();
    },

    scheduleShortlistJob : function(){
        cron.schedule('0 20 * * *', () => {
            console.log('running a task every minute');
        });
    }

}

module.exports = cronScheduler;