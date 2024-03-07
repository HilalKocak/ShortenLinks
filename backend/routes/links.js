const { linkService } = require('../services') 
const ShortUrl = require('../models/shortUrl')

const router = require('express').Router()

router.get('/', async(req, res) => {
    const shortUrls = await ShortUrl.find({ userId: req.params.userId})
    res.render('user', {shortUrls : shortUrls})
})

router.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl == null ) return res.sendStatus(404)
    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.full)
})

router.post('/shortUrls', async(req, res)=> {
    await ShortUrl.create({ full: req.body.fullUrl, short: req.body.code, title:req.body.title })
    res.redirect('/links')
})





module.exports = router
