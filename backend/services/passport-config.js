const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initializePassport(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const tempUser = await getUserByUsername(username);      
        if(!tempUser){
            return done(null, false);
        }
        try{
            if(await bcrypt.compare(password, tempUser.password)){
                return done(null, tempUser);
            }
            else return done(null, false);
        }catch(err){
            return done(err);
        }
    }


    passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser));


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        done(null, await getUserById(id));
    });

}

module.exports = initializePassport;