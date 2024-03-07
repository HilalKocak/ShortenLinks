const router = require('express').Router()
const ShortUrl = require('../models/shortUrl')


router.get('/', async(req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls : shortUrls})
})

module.exports = router