"use strict";

var eNet = require("../index.js");

function usage()
{
    console.log("Usage: node sample-channel.js host channel on|off long-click");
    console.log("   - host: ip or dns name of eNet Gateway");
    console.log("");
    console.log("Example: node sample-channel.js 1.1.1.1 16 on");
}

if (process.argv.length != 5) return usage();

var gw = eNet.gateway({host: process.argv[2]});
var channel = parseInt(process.argv[3]);
if (channel === NaN) return usage();
var on = process.argv[4] === "on" ? true : false;
var longClick = (process.argv.length >= 6) && (process.argv[5] === "long-click");

console.log("Connecting to " + gw.name + " ...");
gw.connect();

// register for channel notifications
gw.on(channel.toString(), function(err, msg) {
    if (!err && msg) console.log("data for channel: " + channel + ": " + JSON.stringify(msg));
});

console.log("Sending sign in request for channel " + channel);
gw.signIn([channel], function(err, res) {
    if (err) console.log("sign in error: " + err);
    else console.log("sign in succeeded: \n" + JSON.stringify(res));
});

console.log("Sending on/up " + longClick ? "long-click" : "" + " command to channel " + channel + ".");

gw.setValue(channel, on, longClick, function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("Channel command succeeded: \n" + JSON.stringify(res));
})
