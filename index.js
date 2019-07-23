// 'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
    mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {useNewUrlParser: true});

require('./models/Registration');
require('./models/Locations');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log(req.body)

    if(req.body.queryResult.action == "payment"){

        
        var method = req.body.queryResult.parameters.method;
        
        console.log(method);

        var response = "";

        if(method == 'bonga points'){
            // console.log("Dial *400# and follow procedure")
            response = "Dial *400#, select manage subscriptions, select your account then select renew subscription, select the account you are renewing then select bonga points";
        }else if(method == 'mpesa'){
            // console.log(false)
            response = "Use M-PESA PAYBILL no. 150501 and key in your Safaricom Fibre Account number under the account section";
        }else if(method == 'ussd'){
            response = "Dial *400#, select manage subscriptions, select preferred package and make payment via mpesa";
        }else if(method == 'Home App'){
            response = "Download the App from Play/AppStore, upon registration select the PAY tab";
        } else{
            response = "Kindly select one method of payment so that we can serve you better. Thank you."
        }
        res.json({
            "fulfillment_text": response
            // "displayText": response
        })
    }
})

app.listen(process.env.PORT || 4000);

// , () => console.log('webhook is listening')

// app.get('/', function (req,res){
//     res.send("Hello I am a chatbot")
// })

// app.post('/webhook', (req, res) => {
//     let body = req.body;

//     if(body.object === 'page'){

//         body.entry.forEach(function(entry){

//             let webhook_event = entry.messaging[0];
//             console.log(webhook_event);
//         });
//         res.status(200).send('EVENT_RECEIVED');
//     } else{
//         res.sendStatus(404);
//     }
// })

// app.get('/webhook', (req, res) => {

//     let VERIFY_TOKEN = "myvoiceisnotmypassword"

//     let mode = req.query['hub.mode'];
//     let token = req.query['hub.verify_token'];
//     let challenge = req.query['hub.challenge'];

//     if(mode && token){

//         if (mode === 'subscribe' && token === VERIFY_TOKEN){
//             console.log('WEBHOOK_VERIFIED');
//             res.status(200).send(challenge);
//         } else{
//             res.sendStatus(403);
//         }
//     }
// })