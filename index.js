'use strict';

const apiai = require('apiai');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

if(!config.FB_PAGE_TOKEN){
    throw new Error('missing FB_PAGE_TOKEN');
}
if (!config.FB_VERIFY_TOKEN) {
	throw new Error('missing FB_VERIFY_TOKEN');
}
if (!config.SERVER_URL) { //used for ink to static files
	throw new Error('missing SERVER_URL');
}










app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, function(){
    console.log('webhook is listening');
});

app.get('/', function (req,res){
    res.send("Hello world, I am a chatBot")
})

app.post('/webhook', (req, res) => {
    let body = req.body;

    if(body.object === 'page'){

        body.entry.forEach(function(entry){

            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('EVENT_RECEIVED');
    } else{
        res.sendStatus(404);
    }
})

app.get('/webhook', function (req, res) {
    console.log("request");

    if(mode && token){

        if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN){
            res.status(200).send(req.query['hub.challenge']);
        
        } else{
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    }
})