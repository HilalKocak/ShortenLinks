const { linkService } = require('../services') 
const ShortUrl = require('../models/shortUrl')

const router = require('express').Router()

router.post('/shortUrls', async(req, res)=> {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})


module.exports = router
