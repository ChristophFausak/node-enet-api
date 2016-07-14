"use strict";

var eNet = require("../index.js");

console.log("Discovering eNet Gateways ...");

eNet.discover(function(err, gws) {
    if (err) console.log(err);
    else console.log(JSON.stringify(gws));
});
