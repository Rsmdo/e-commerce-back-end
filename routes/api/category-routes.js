const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //findall function 
  Category.findAll({
    //to get associated products 
    include: {
      model: Product, 
      //selected all needed categoeries
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  //take the data and pass
  .then((dbCatData) => {
    //if no data found return a 404 (no cat found)
    if (!dbCatData) {
      res.status(404)
      //may change this to display message in json
      console.log("no categories found")
      return;
    }
    res.json(dbCatData);

  })
  //if error
  .catch(err => {
    res.status(500).json(err); 
    
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //useing findone 
  Category.findOne({
    where: {
      //to find specific produc need id 
      id: req.params.id
    },
    include: {
      //cat needed to include with request
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((dbCatData) => {
    //if no data found return a 404 (no cat found)
    if (!dbCatData) {
      res.status(404)
      //may change this to display message in json
      console.log("no categories found")
      return;
    }
    res.json(dbCatData);

  })
  //if error
  .catch(err => {
    res.status(500).json(err); 
    
  });
});


router.post('/', (req, res) => {
  // create a new category
  //use create 
  Category.create({
    //creating a new cat
    category_name: req.body.category_name
  })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    // update a category by its `id` value
    Category.update(req.body, {
      where: {
        //find correct cat to update
        id: req.params.id
      }
    })
    .then((dbCatData) => {
      //if no data found return a 404 (no cat found)
      if (!dbCatData) {
        res.status(404)
        //may change this to display message in json
        console.log("no categories found")
        return;
      }
      res.json(dbCatData);
  
    })
    //if error
    .catch(err => {
      res.status(500).json(err); 
      
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  //use destroy not delete
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbCatData) => {
    //if no data found return a 404 (no cat found)
    if (!dbCatData) {
      res.status(404)
      //may change this to display message in json
      console.log("no categories found")
      return;
    }
    res.json(dbCatData);

  })
  //if error
  .catch(err => {
    res.status(500).json(err); 
    
  });
});

module.exports = router;
