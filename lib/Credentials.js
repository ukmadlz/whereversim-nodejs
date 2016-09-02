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

// Necessary Dependencies
var assert = require('assert');
var _ = require('lodash');

var Credentials = {
  parse: function(credentials) {
    // Validate Credentials
    assert.equal(typeof credentials, 'object',
      'You must provide a valid credentials object');
    if (_.isString(credentials.auth_token)){
      assert.equal(typeof credentials.auth_token, 'string',
        'You must provide a valid auth_token');
    } else {
      if (_.isString(credentials.application_token)) {
        assert.equal(typeof credentials.application_token, 'string',
          'You must provide a valid application_token');
      } else {
        if (_.isString(credentials.refresh_token)) {
          assert.equal(typeof credentials.refresh_token, 'string',
            'You must provide a valid refresh_token');
        } else {
          assert.equal(typeof credentials.username, 'string',
            'You must provide a valid username');
          assert.equal(typeof credentials.password, 'string',
            'You must provide a valid password');
        }
      }
    }
    return credentials;
  }
};
module.exports = Credentials;
