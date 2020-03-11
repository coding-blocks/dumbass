const passport = require('passport');
const BearerStatergy = require('passport-http-bearer');

const {getClientByToken} = require('services/db');


passport.use(new BearerStatergy(
    async (token,done) => {
        const client = await getClientByToken(token)
        if(!client){return done(null,false)}
        return done(null,client)
    }
));

module.exports = passport;