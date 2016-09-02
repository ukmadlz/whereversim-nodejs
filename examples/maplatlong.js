'use strict';

var _ = require('lodash');

var whereversim = require('../lib/Client');
var whereverSIM = new whereversim({
  auth_token: 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJcL2FwaVwvdjFcL2F1dGhlbnRpY2F0aW9uIiwiZXNjLmFwcCI6NjYsImVzYy51c2VyIjpudWxsLCJlc2Mub3JnIjoxNDIyLCJpc3MiOiJkZXZAc3BjLWZyb250ZW5kIiwiZXhwIjoxNDcyODMzNDg4LCJpYXQiOjE0NzI4MTkwODh9.D1dBN00O5mnTFSAYEgfAqVf4PN2NhjAQ0Nxoh2hpLGvYi4x9QP3cS6AgeF60K1B6yiZzdrGwVmxdKOPWLi4xYA',
});

var Cloudant = require('cloudant');
var cloudant = Cloudant({
  account: 'elsmore',
  username: 'ionlyoungeredinsusebroud',
  password: '72108c2813a8c7001fc6ba1dc7024ea1de6ecfbe',
});
var mapdb = cloudant.use('whereversim');

whereverSIM.messages.listSMS({
  endpoint: 8394004
}, function (error, response, body) {
  _.forEach(body, function(value) {
    if (value.payload.substr(0, 1) == '[') {
      var id = value.id.toString();
      var latlong = JSON.parse(value.payload).reverse();
      mapdb.get(id, function (err, resp) {
        var coord = {
          _id: value.id.toString(),
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: latlong
          },
        };
        if(resp && resp._rev) {
          coord._rev = resp._rev;
        }
        mapdb.insert(coord, function (err, resp) {
          if(!err) {
            console.log('Co-ordinates Set')
          }
        });
      });
    }
  });
});
