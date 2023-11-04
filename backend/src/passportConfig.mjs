import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/User.mjs'; 

const passportConfig = () => {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

export default passportConfig;