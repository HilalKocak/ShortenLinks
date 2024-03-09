const router = require('express').Router()
const ShortUrl = require('../models/shortUrl')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const initializePassport = require('../passport-config')

initializePassport(
    passport,
    async email => {
        return await User.findOne({ email: email });
    },
    async id => {
        return await User.findById(id);
    }
);


router.get('/', (req, res) => {
    res.render('layout')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
           
            return res.redirect(`/users/${user.id}`);
        });
    })(req, res, next);
});

router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
})

// router.get('/:shortUrl', async(req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl, user: req.params.userId})
//     if(shortUrl == null ) return res.sendStatus(404)
//     shortUrl.clicks++
//     await shortUrl.save()
  
//     res.redirect(shortUrl.full)
//   })
module.exports = router