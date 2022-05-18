const router = require('express').Router();
// const { toDefaultValue } = require('sequelize/types/lib/utils');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //use findall 
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        //to identyify the model 
        model: Product,
        //getting all associated with  products 
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((dbTagData) => {
      //if data found send message
      if (!dbTagData) {
        res.status(404).json({message: 'No tag found'})
        // console.log('no tag found')
        return;
      }
      //else if found 
      res.json(dbTagData);
    })
    //if error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // find one 
  Tag.findOne({
    where: {
      //finding specific id
      id: req.params.id,
    },
    include: [
      {
        // for product data using product model 
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
  .then((dbTagData) => {
    //if data found send message
    if (!dbTagData) {
      res.status(404)
      // console.log('no tag found')
      return;
    }
    //else if found 
    res.json(dbTagData);
  })
  //if error catch
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  //use create 
  Tag.create({
    //creating a tag 
    tag_name: req.body.tag_name,
  })
  //passing data into db as json
    .then((dbTagData) => res.json(dbTagData))
    //if err catcj amd semd statis pf 500 not 404
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  //use update 
  Tag.update(req.body, { 
    where: {
      //to identify correct id to update
      id: req.params.id
    }
  })
  .then((dbTagData) => {
    //if data found send message
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found'})
      // console.log('no tag found')
      return;
    }
    //else if found 
    res.json(dbTagData);
  })
  //if error catch
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  //use destory 
  //samme as update but sub destroy 
  Tag.destroy ({
    where: {
      //locate correct id 
      id: req.params.id
    }
  })
  .then((dbTagData) => {
    //if data found send message
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found'})
      // console.log('no tag found')
      return;
    }
    //else if found 
    res.json(dbTagData);
  })
  //if error catch
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
