"use strict";

var eNet = require("../index.js");

if (process.argv.length != 3)
{
    console.log("Usage: node sample-gateway.js host");
    console.log("   - host: ip or dns name of eNet Gateway");
    return;
}

var gw = eNet.gateway({host: process.argv[2]});

console.log("Connecting to " + gw.name + " ...");
gw.connect();

console.log("Requesting gateway version.");
gw.getVersion(function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Requesting Block List")
gw.getBlockList(function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Requesting Channel Info")
gw.getChannelInfo(function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Requesting Project List")
gw.getProjectList(function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Sending sign out request for all channels.");
gw.signOut([], function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Sending sign in request for channel 16.");

gw.signIn([16], function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})

console.log("Sending on/up long-click command to channel 16.");

gw.setValue(16, true, true, function(err, res) {
    if (err) console.log("error: " + err);
    else console.log("command succeeded: \n" + JSON.stringify(res));
})
