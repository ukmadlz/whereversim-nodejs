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

// Dependencies
var _ = require('lodash');

// Credentials
var APIRequest = require('./APIRequest');

// Credentials
var Credentials = require('./Credentials');

// Authenitcation
var Authentication = require('./Authentication');

// Messages
var Endpoint = require('./Endpoint');

// Messages
var Messages = require('./Messages');

var Client =
/**
 * @param {Credentials} credentials - whereverSIM Credentials
 * @param {string} credentials.username - the whereverSIM Username
 * @param {string} credentials.password - the whereverSIM Password
 * @param {object} options Additional options
 */
function Client(credentials, options) {
  // Validate Credentials
  this._credentials = Credentials.parse(credentials);
  this._options = options;

  this.authentication = new Authentication(this._credentials, this._options);

  if (!this._credentials.auth_token) {
    var _this = this;

    this.authentication.newToken(function (error, body) {
      if (!error) {
        console.log
        _this._credentials.auth_token = body.auth_token
      }
    });
  }

  // Messages
  this.endpoint = new Endpoint(this._credentials, this._options);

  // Messages
  this.messages = new Messages(this._credentials, this._options);
};

module.exports = Client;
