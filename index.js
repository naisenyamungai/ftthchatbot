'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, () => console.log('webhook is listening'));

app.get('/', function (req,res){
    res.send("Hello I am a chatbot")
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

app.get('/webhook', (req, res) => {

    let VERIFY_TOKEN = "myvoiceisnotmypassword"

    let mode = req.quert['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if(mode && token){

        if (mode === 'subscribe' && token === VERIFY_TOKEN){
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else{
            res.sendStatus(403);
        }
    }
})