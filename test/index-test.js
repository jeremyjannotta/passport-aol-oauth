var vows = require('vows');
var assert = require('assert');
var util = require('util');
var AOL = require('passport-aol-oauth');


vows.describe('passport-aol-oauth').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(AOL.version);
    },
    'should export OAuth2 strategy': function (x) {
      assert.isFunction(AOL.Strategy);
      assert.isFunction(AOL.OAuth2Strategy);
      assert.equal(AOL.Strategy, AOL.OAuth2Strategy);
    }
  }
  
}).export(module);
