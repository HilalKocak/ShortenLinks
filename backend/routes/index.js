const router = require('express').Router()
const ShortUrl = require('../models/shortUrl')


router.get('/', (req, res) => {
    res.render('layout')
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})

// router.get('/:shortUrl', async(req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl, user: req.params.userId})
//     if(shortUrl == null ) return res.sendStatus(404)
//     shortUrl.clicks++
//     await shortUrl.save()
  
//     res.redirect(shortUrl.full)
//   })
module.exports = router