"use strict";

var eNet = require("../index.js");
var discover = new eNet.discover();

console.log("Discovering eNet Gateways ...");

discover.on('discover', function(gw) {
    console.log('New gateway: ' + JSON.stringify(gw));
})

discover.discover(function(err, gws) {
    if (err) console.log('Error: ' + err);
    else console.log('All discovered gateways: ' + JSON.stringify(gws));
});
