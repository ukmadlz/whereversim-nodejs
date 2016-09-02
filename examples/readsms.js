'use strict';

var whereversim = require('../lib/Client');
var whereverSIM = new whereversim({
  application_token: 'test',
});

whereverSIM.endpoint.listEndpoints({}, function (error, response, body) {
  console.log(error, response);
});

whereverSIM.messages.listSMS({
  endpoint: 8393384
}, function (error, response, body) {
  console.log(error, response);
});
