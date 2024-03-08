
const {userService, categoryService} = require('../services') 
const Category = require('../models/category')
const ShortUrl = require('../models/shortUrl')


const router = require('express').Router()

router.get('/', async(req, res)=> {
    const users = await userService.load()
    // res.send(users)
    res.render('users', {users:users})
    
})

router.get('/:userId', async(req, res)=> {

    const user = await userService.find(req.params.userId)
    if (!user) return res.status(404).send('Can not find user')
    const categories = await Category.find({user:req.params.userId});
    const shortUrls = await ShortUrl.find({ user: req.params.userId})

    // res.send(user)
    res.render('user', { user:user, categories:categories, shortUrls:shortUrls })
   
})

router.get('/:userId/categories', async(req, res)=> {
    const { userId } = req.params;
    const user = await userService.find(userId)
    if (!user) return res.status(404).send('Can not find user')
    const categories = await Category.find({user:userId});
    
    res.render('user', {categories:categories})
    res.send(categories)
})



router.post('/', async(req, res, next)=> {
  try{
    const user = await userService.insert(req.body);
    res.send(user)
  }catch(e){
    next(e)
  }
})

router.delete('/:userId', async(req, res) => {
    await userService.removeBy('_id', req.params.userId)
    res.send('OK')
})



router.post('/:userId/category', async (req, res) => {
  try {
      const { userId } = req.params;
      const { name, author, genreId } = req.body;
      const category = new Category({
          user: userId,
          name
      });
      await category.save();
      res.status(201)
      res.send(category);

  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.patch('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  const updatedUser = await userService.update(userId, { name });
  res.status(200).json(updatedUser);
})

router.get('/:userId/:shortUrl', async(req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl, user: req.params.userId})
  if(shortUrl == null ) return res.sendStatus(404)
  shortUrl.clicks++
  await shortUrl.save()

  res.redirect(shortUrl.full)
})

router.post('/:userId/shortUrls', async(req, res)=> {
  console.log("req.params.userId ", req.params.userId )

  await ShortUrl.create({ full: req.body.fullUrl, short: req.body.code, title:req.body.title, user:req.params.userId })
  res.redirect(`/users/${req.params.userId }`)
})
module.exports = router