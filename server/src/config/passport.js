import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../table';
import { encode, decode } from '../utils/tokens';
import {checkPassword} from '../utils/security';

let authorsTable = new Table('Authors');
let tokensTable = new Table('Tokens');

//passport is responsible for protecting api routes
function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    }, (email, password, done) => {
        authorsTable.find({ email })
        .then((results) => {
            return results[0];
        }).then((author) => {
            if (author && author.hash) {
                checkPassword(password, author.hash) 
                .then((matches) => {
                    if (matches === true) {
                        tokensTable.insert({
                            userid: author.id
                        }).then((idObj) => {
                            return encode(idObj.id);
                        }).then((tokenValue) => {
                            return done(null, {token: tokenValue});
                        })
                    } else {
                        // password is incorrect
                        return done(null, false, { message: 'Invalid credentials' });
                    }
                }).catch((err) => {return done(null, err);})
            } else {
               return done(null, false, {message: 'Invalid loging'});
            }
        }).catch((err) => {
            return done(err);
        })
    }));
    
    passport.use(new BearerStrategy(async (token, done) => {
        let tokenId = decode(token);
        if (!tokenId) {
            return done(null, false, { message: 'Invalid token' });
        }
        try {
            let tokenRecord = await tokensTable.getOne(tokenId);
            let user = await authorsTable.getOne(tokenRecord.userid);
            if (user) {
                delete user.password;
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid token' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    app.use(passport.initialize());
}

export default configurePassport;