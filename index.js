"use strict";

var discover = require("./eNet-api/discover");
var gateway = require("./eNet-api/gateway");


function eNet(config) {
    this._config = config;
}

module.exports.eNet = eNet;
module.exports.discover = discover;
module.exports.gateway = gateway;
