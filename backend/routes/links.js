const { linkService } = require('../services') 
const ShortUrl = require('../models/shortUrl')

const router = require('express').Router()

router.post('/shortUrls', async(req, res)=> {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})


router.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl == null ) return res.sendStatus(404)
    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.full)
})



module.exports = router
