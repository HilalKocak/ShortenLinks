
const {categoryService} = require('../services') 

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const categories = await categoryService.load()
    res.send({categories})
 
})

//get category with ID
router.get('/:categoryId', async(req, res)=> {
    const category = await categoryService.find(req.params.categoryId)
    if (!category) return res.status(404).send('Can not find category')
    res.send(category)
    
})


router.delete('/delete-category/:categoryId', async(req, res) => {
    await categoryService.removeBy('_id', req.params.categoryId)
    res.send('OK')
})

router.patch('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
  
    await categoryService.update(categoryId, { name });
    res.send('Updated!');
  });



module.exports = router