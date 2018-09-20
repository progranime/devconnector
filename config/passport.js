const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    // null because there is no error
                    // pass the user
                    return done(null, user)
                }

                // false because there is no user
                return done(null, false)
            })
            .catch(err => console.log(err))
    }))
}