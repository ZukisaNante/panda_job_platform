const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

/* module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
       // Match user JOB SEEKER
      JobSeeker.findOne({
        email: email
      }).then(jobSeeker => {
        if (!jobSeeker) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password JOB SEEKER
        bcrypt.compare(password, jobSeeker.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, jobSeeker);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

// USER JOB SEEKER
  passport.serializeUser(function(jobSeeker, done) {
    done(null, jobSeeker.id);
  });

// USER JOB SEEKER
  passport.deserializeUser(function(id, done) {
    JobSeeker.findById(id, function(err, jobSeeker) {
      done(err, jobSeeker);
    });
  });

};
 */
