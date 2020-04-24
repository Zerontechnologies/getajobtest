import config from './config';
import logger from './log4js';
import redis from 'redis';
const redisClient = redis.createClient();

let redisStore = {
    checkRedisConnection : function(){
        redisClient.on('connect', function(err) {
            if(!err){
                logger.log('Redis client connected');
                //return true;
            } else{
                logger.log('Something went wrong ' + err);
                //return false;
            }
        });  
    },

    saveToRedis : function(key, value){
        //Check connection
        this.checkRedisConnection();

        //Save data
        redisClient.set(key, value);
    },

    getFromRedis : function(key){
        //Check connection
        this.checkRedisConnection();
        
        return new Promise((resolve, reject) => {
            redisClient.get(key, function(err, result) {
                if(err){
                    logger.log(err);
                    reject(err);
                }
                else{
                    logger.log('GET result -> ' + result);
                    resolve(result);
                }
            });
        });     
    },


   getCandidateData : function(){
       'use strict'

       let user_id = '';
       let first_name = '';
       
        this.getFromRedis(config.tag_user_id)
            .then(function (fulfilled) {
               // logger.log('user_id')
               // logger.log(fulfilled);
                user_id = fulfilled;
            })
            .catch(function (error) {
                logger.log(error.message);
            });

        this.getFromRedis(config.tag_first_name)
            .then(function (fulfilled) {
              //  logger.log('first_name')
              //  logger.log(fulfilled);
                first_name = fulfilled;
            })
            .catch(function (error) {
                logger.log(error.message);
            });

        logger.log('user_id - ' + user_id)
        logger.log('first_name - ' + first_name)

       /*
       let user_id = this.checkifUndefined(this.getItem(req, config.tag_user_id));
       let user_uuid = this.checkifUndefined(this.getItem(req, config.tag_user_uuid));
       let first_name = this.checkifUndefined(this.getItem(req, config.tag_first_name));
       let last_name = this.checkifUndefined(this.getItem(req, config.tag_last_name));
       let email = this.checkifUndefined(this.getItem(req, config.tag_email));
       let phone_number = this.checkifUndefined(this.getItem(req, config.tag_phone_number));
       let user_role = this.checkifUndefined(this.getItem(req, config.tag_user_role));
       let is_logged_in = this.checkifUndefined(this.getItem(req, config.tag_is_logged_in));
       let is_activated = this.checkifUndefined(this.getItem(req, config.tag_is_activated));
       let resume_id = this.checkifUndefined(this.getItem(req, config.tag_resume_id));
       let is_first_login = this.checkifUndefined(this.getItem(req, config.tag_is_first_login));
       let gender = this.checkifUndefined(this.getItem(req, config.tag_gender));
       let tagline = this.checkifUndefined(this.getItem(req, config.tag_tagline));
       let address = this.checkifUndefined(this.getItem(req, config.tag_address));
       let profile_picture = this.checkifUndefined(this.getItem(req, config.tag_profile_picture_url));


       logger.log("in getting data");
       //logger.log(req.session)

       

       let user_id = this.checkifUndefined(sessionData.user_id);
       let user_uuid = this.checkifUndefined(sessionData.user_uuid);
       let first_name = this.checkifUndefined(sessionData.first_name);
       let last_name = this.checkifUndefined(sessionData.last_name);
       let email = this.checkifUndefined(sessionData.email);
       let phone_number = this.checkifUndefined(sessionData.phone_number);
       let user_role = this.checkifUndefined(sessionData.user_role);
       let is_logged_in = this.checkifUndefined(sessionData.is_logged_in);
       let is_activated = this.checkifUndefined(sessionData.is_activated);
       let resume_id = this.checkifUndefined(sessionData.resume_id);
       let is_first_login = this.checkifUndefined(sessionData.is_first_login);
       let gender = this.checkifUndefined(sessionData.gender);
       let tagline = this.checkifUndefined(sessionData.tagline);
       let address = this.checkifUndefined(sessionData.address);
       let profile_picture = this.checkifUndefined(sessionData.profile_picture);

       let full_name = first_name + ' ' + last_name;

       let data = 
           {
             user_id : user_id,
             user_uuid : user_uuid,
             first_name : first_name,
             last_name : last_name,
             full_name : full_name,
             email : email,
             phone_number : phone_number,
             user_role : user_role,
             is_logged_in : is_logged_in,
             is_activated : is_activated,
             resume_id : resume_id,
             is_first_login : is_first_login,
             gender : gender,
             tagline : tagline,
             address : address,
             profile_picture : profile_picture
           };
*/
      // return data;
   },
}

module.exports = redisStore;