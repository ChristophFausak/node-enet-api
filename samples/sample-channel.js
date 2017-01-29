"use strict";

var eNet = require("../index.js");

function usage()
{
    console.log("Usage:");
    console.log("    node sample-channel.js host channel on|off [longclick]   - Send long/short click to channel");
    console.log("    node sample-channel.js host channel dim|blind value      - Send Dimmer or Blinds positions value to channel");
    console.log("       - host: ip or dns name of eNet Gateway");
    console.log("");
    console.log("Examples:");
    console.log("   node sample-channel.js 1.1.1.1 16 on         (turns channel 16 on)");
    console.log("   node sample-channel.js 1.1.1.1 16 dim 25     (sets dimmer on channel 16 to 25%)");
    console.log("   node sample-channel.js 1.1.1.1 16 blind 10   (sets blinds on channel 16 to 10%)");
}

if (process.argv.length < 5) return usage();

var gw = eNet.gateway({host: process.argv[2]});

var channel = parseInt(process.argv[3]);
if (isNaN(channel)) return usage();

var dimVal, blindVal;
if (process.argv[4] === "dim") {
    if (process.argv.length < 6) return usage();
    dimVal = parseInt(process.argv[5]);
    if (isNaN(dimVal)) return usage();
} else if (process.argv[4] === "blind") {
    if (process.argv.length < 6) return usage();
    blindVal = parseInt(process.argv[5]);
    if (isNaN(blindVal)) return usage();
} else {
    var on = process.argv[4] === "on" ? true : false;
    var longClick = (process.argv.length >= 6) && (process.argv[5] === "longclick");
}


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

if (!isNaN(dimVal)) {
    console.log("Sending dimmer value " + dimVal + " to channel " + channel + ".");

    gw.setValueDim(channel, dimVal, function(err, res) {
        if (err) console.log("error: " + err);
        else console.log("Channel command succeeded: \n" + JSON.stringify(res));
    })
} else if (!isNaN(blindVal)) {
    console.log("Sending blinds value " + dimVal + " to channel " + channel + ".");

    gw.setValueBlind(channel, blindVal, function(err, res) {
        if (err) console.log("error: " + err);
        else console.log("Channel command succeeded: \n" + JSON.stringify(res));
    })
} else {
    console.log("Sending on/up " + longClick ? "long-click" : "" + " command to channel " + channel + ".");

    gw.setValue(channel, on, longClick, function(err, res) {
        if (err) console.log("error: " + err);
        else console.log("Channel command succeeded: \n" + JSON.stringify(res));
    })
}
