// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

var Request = require('request');
var _ = require('lodash');

var APIRequest = function (credentials, options) {
  var APIObject = {
    options: options,
    rootUrl: 'https://portal.whereversim.com/api/',
    apiVersion: 'v1',
    generateUrl: function (endpoint) {
      return APIObject.rootUrl + APIObject.apiVersion + '/' + endpoint;
    },
    apiCall: function (endpoint, method, body, callback) {
      var options = {
        method: method,
        url: APIObject.generateUrl(endpoint),
        json: true,
        headers: {
        },
      };
      if (method == 'POST') {
        options.body = body;
      }
      if (credentials.auth_token) {
        options.headers['Authorization'] = 'Bearer ' + credentials.auth_token;
      }
      if (_.isFunction(callback)) {
        Request(options, callback);
      } else {
        return Request(options);
      }
    },
  };
  return APIObject;
};

module.exports = APIRequest;
