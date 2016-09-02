'use strict';

var _ = require('lodash');

var whereversim = require('../lib/Client');
var whereverSIM = new whereversim({
  application_token: 'borked',
});

var Cloudant = require('cloudant');
var cloudant = Cloudant({
  account: 'account',
  username: 'apiuser',
  password: 'apipass',
});
var mapdb = cloudant.use('dbname');

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
