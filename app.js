var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);

let smartcast = require('vizio-smart-cast');
let readline = require('readline'); // user input via cmd line
let tv = new smartcast('192.168.86.29');

// configure cmd line input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initiate a pairing request with a smartcast device
tv.pairing.initiate().then((response) => {

    // prompt the user for the pin that is displayed on the smartcast device
    rl.question('Enter PIN:', (answer) => {

        // send the pin to the smartcast device to complete the pairing process
        tv.pairing.pair(answer).then((response) => {

            // log the token to be used for future, authenticated requests
            console.log(response.ITEM.AUTH_TOKEN);
        });

        rl.close();
    });
});
