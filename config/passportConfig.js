const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../model/queries');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await model.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await model.getUserByUserid(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
