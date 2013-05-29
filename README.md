# Passport-AOL-OAuth

[Passport](https://github.com/jaredhanson/passport) strategies for
authenticating with AOL using OAuth 2.0.

## Installation

    $ npm install passport-aol-oauth


## Usage of OAuth 2.0

#### Configure Strategy

The AOL OAuth 2.0 authentication strategy authenticates users using an AOL
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID and callback URL.

    passport.use(new AOLStrategy({
        clientID: AOL_CLIENT_ID,
        callbackURL: "http://127.0.0.1:3000/auth/aol/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ AOLId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'AOL'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/aol',
      passport.authenticate('aol'),
      function(req, res){
        // The request will be redirected to AOL for authentication, so
        // this function will not be called.
      });

    app.get('/auth/aol/callback',
      passport.authenticate('aol', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete working example, refer to the [OAuth 2.0 example](https://github.com/jeremyjannotta/passport-aol-oauth/tree/master/examples/oauth2).

## Tests

    $ npm install --dev
    $ make test

## Credits

  - [Jeff Rodenburg](http://github.com/jrodenburg)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2013 Jeremy Jannotta

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
