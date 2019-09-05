const express = require('express');

// Import Data
const Data = require('./postDb');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  Data.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: "There was a problem fetching the posts." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Data.getById(id)
    .then(post => {
      console.log(post)
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was a problem fetching this post." })
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Data.remove(id)
    .then(removed => {
      console.log(removed)
      res.status(200).json(removed)
    }) 
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was a problem deleting this post." })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  Data.update(id, { text })
    .then(updated => {
      console.log(updated)
      res.status(200).json(updated)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was a problem updating this post." })
    })
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;