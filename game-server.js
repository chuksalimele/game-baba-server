
'use strict';
/*var fs = require('fs');
 var options = {
 //pfx: fs.readFileSync('security/trade.flexc.ca.pfx'),
 //passphrase: 'furTQkwhYy3m'
 cert: fs.readFileSync('security/matadorprimeelcmarketscom.cer'),
 key: fs.readFileSync('security/matadorprimeelcmarketscom.key')
 };*/

var appLoader = require('./app-loader')();
var RCallHandler = require('./rcall-handler');
var express = require('express');
var app = express();
//var http_app = express();
var helmet = require('helmet');
var bodyParser = require('body-parser');
//var https = require('https');
//var secureHttpServer = https.Server(options, app);
var http = require('http');//use for redirecting to https

var accRoute = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./config');
var mongo = require('mongodb').MongoClient;
var Redis = require('ioredis');
var realtimeSession = require('realtime-session');
var col = require('mongo_collections');
var util = require('./util/util');
var usersIO = null;
var db;
var redis;


class Main {

    constructor() {
        this.init();
    }
    async init() {

        var mongo_url = 'mongodb://' + config.MONGO_HOST + ':' + config.MONGO_PORT + '/' + config.MONGO_DB_NAME;
        try {
            db = await mongo.connect(mongo_url, {
                poolSize: 50
                        //,ssl: true //TODO
                        //and many more optionS TODO - see doc at http://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
            });
            console.log('Connected to mongo server at : ' + mongo_url);
        } catch (e) {
            console.error(e);
            console.log("Server cannot start!");
            process.exit(1);
        }

        redis = new Redis();

        app.set('appSecret', config.jwtSecret); // secret gotten from the config file
        app.use(this.onRequestEntry.bind(this));//application level middleware
        app.set('appSecret', config.jwtSecret); // secret gotten from the config file
        app.use(express.static(__dirname + '/..')); //define the root folder to my web resources e.g javascript files        
        app.use(helmet());//secure the server app from attackers - Important!
        app.use(bodyParser.json());// to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({extended: true}));// to support URL-encoded bodies   
        app.use('/access', accRoute); //set this router base url
        accRoute.use(this.accessRouteRequest.bind(this));
        //commented out since we now use reverse proxy - ngnix
        app.get('/*', this.serveFile.bind(this));//route for web client resources to server web pages
        var httpServer = http.createServer(app);//NEW - we now use reverse proxy server - ngnix
        //var httpServer = http.createServer(this.redirectToHttps.bind(this));//create http server to redirect to https
        //secureHttpServer.listen(config.HTTPS_PORT, config.HOST, this.onListenHttps.bind(this));//listen for https connections        

        httpServer.listen(config.HTTP_PORT, config.HOST, this.onListenHttp.bind(this));//listen for http connections

        const sObj = new ServerObject();
        realtimeSession(httpServer, sObj, util);
        new RCallHandler(sObj, util, app, appLoader);//initilize here! - For a reason I do not understand the express app object does not use the body parse if this initialization is done outside this async init method- the request body is undefined.But if this init method is not declared async it works normal.  Shocking... anyway!

    }
    redirectToHttps(req, res) {
        //var req_host = req.headers['host'];//no need anyway
        res.writeHead(301, {"Location": "https://" + config.HOST + req.url});
        res.end();
    }
    onRequestEntry(req, res, next) {
        //request metrics
        //metrics.markRequest();// measure requests per time e.g per min, per hour and per day
        //metrics.incrementRequest();
        res.on('finish', this.onRequestFinish);
        next();
    }
    onRequestFinish() {
        //metrics.decrementRequest();                
    }
    serveFile(req, res) {
        var reqFile = '/index.html'; //default
        if (req.path !== '/') {
            reqFile = decodeURIComponent(req.path);// decodeURIComponent() will be prefered to decodeURI() because it decodes URI special markers such as &, ?, #, etc while decodeURI() does not
        }
        console.log(reqFile);//UNCOMMENT TO SEE THE PATHS
        res.sendFile(__dirname + '/public/www/' + reqFile);
    }
    accessRouteRequest(req, res, next) {

        //do some stuff here!
        console.log(req.body);

        next();
    }
    onListenHttps() {
        console.log('listening on :' + config.HOST + ":" + config.HTTPS_PORT);
    }

    onListenHttp() {
        console.log('listening on :' + config.HOST + ":" + config.HTTP_PORT);
    }
}

class ServerObject {

    constructor() {

        //var mysql = require('mysql');
        //var Redis = require('ioredis');
        this._shortid = require('shortid');
        this._moment = require('moment');

    }
    /**
     * Get the io socket ids of this user. If a callback is provided
     * the method is asynchronous but if no callback then the method
     * will wait asynchronuously until the id is returned using
     *  ES7 async/await feature. Or throw exception if error occurs
     * 
     * @param {type} user_id -  the user id map to the io socket id
     * @param {type} callback - the callback - if not provided the 
     * method will wait using async/await -note that this may not be 
     * ideal in most case in this game server.
     * @returns {undefined}
     */
    async getUserSocks(user_id, callback) {

        if (!callback) {
            var user_sock_str = await this.redis.lpop("socket_id:" + user_id);
            if(user_sock_str){
                return JSON.parse(user_sock_str);
            }
            
            return  null;
            
        } else {
            this.redis.lrange('lrange', "socket_id:" + user_id, 0, -1, function (err, user_sock_str) {
                if(err){
                    console.log(err);
                    return;
                }
                if(!user_sock_str){
                    callback([]);//make as empty array instead
                }
                callback(JSON.parse(user_sock_str));
            });
        }
    }

    get MAX_GROUP_MEMBERS() {
        return 300;
    }

    get MAX_ALLOW_QUERY_SIZE() {
        return 500;
    }

    get db() {
        return db;
    }

    get redis() {
        return redis;
    }

    get shortid() {
        return this._shortid;
    }

    get moment() {
        return this._moment;
    }

    get usersIO() {
        return usersIO;
    }

    get col() {
        return col;
    }

    get PUBSUB_FORWARD_MOVE() {
        return 'PUBSUB_FORWARD_MOVE';
    }

    get PUBSUB_USER_SESSION_SIZE_EXCEEDED() {
        return 'PUBSUB_USER_SESSION_SIZE_EXCEEDED';
    }

    get PUBSUB_ACKNOWLEGE_MOVE_SENT() {
        return 'PUBSUB_ACKNOWLEGE_MOVE_SENT';
    }

    get PUBSUB_SEND_GROUP_JOIN_REQUEST() {
        return 'PUBSUB_SEND_GROUP_JOIN_REQUEST';
    }
}


const main = new Main();