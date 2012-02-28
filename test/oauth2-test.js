var vows = require('vows');
var assert = require('assert');
var util = require('util');
var AOLStrategy = require('passport-aol-oauth/oauth2');


vows.describe('AOLStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new AOLStrategy({
        clientID: 'ABC123'
      },
      function() {});
    },
    
    'should be named AOL': function (strategy) {
      assert.equal(strategy.name, 'aol');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new AOLStrategy({
        clientID: 'ABC123'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var body = '{ \
         "id": "00000000000000", \
         "email": "fred.example@gmail.com", \
         "verified_email": true, \
         "name": "Fred Example", \
         "given_name": "Fred", \
         "family_name": "Example", \
         "picture": "https://lh5.AOLusercontent.com/-2Sv-4bBMLLA/AAAAAAAAAAI/AAAAAAAAABo/bEG4kI2mG0I/photo.jpg", \
         "gender": "male", \
         "locale": "en-US" \
        }';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'aol');
        assert.equal(profile.id, '00000000000000');
        assert.equal(profile.displayName, 'Fred Example');
        assert.equal(profile.name.familyName, 'Example');
        assert.equal(profile.name.givenName, 'Fred');
        assert.equal(profile.emails[0].value, 'fred.example@gmail.com');
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new AOLStrategy({
        clientID: 'ABC123'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
}).export(module);
