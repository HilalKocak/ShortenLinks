const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {userService} = require('./services') 

function initialize(passport) {
    const authenticateUser = async(email, password, done) => {
        const user = await userService.getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'No user with that mail'})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return(done(null, user))
            }else{
                return done(null, false, { message: "Password incorrect"})
            }
            
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((user, done) => {
        return done(null, userService.getUserById(user._id))
    })
}

module.exports = initialize