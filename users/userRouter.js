const express = require('express');
const app = express();

// Import Data
const Data = require('./userDb');
let nextId = 10;

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  const newUser = req.body;
  const newUserId = nextId++;

  Data.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error adding a user." })
    })
});

router.post('/:id/posts', (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  newPost.user_id = id;

  Data.insert(newPost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while adding the post." })
    })
});

router.get('/', (req, res) => {
  Data.get()
    .then(names => {
      res.status(200).json(names)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error uploading all of the DB resources." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Data.getById(id)
    .then(name => {
      res.status(200).json(name)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error uploading this individual." })
    })
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  Data.getById(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: "There was a problem fetching this user/'s posts"})
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Data.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      res.status(500).json({ error: "There was a problem removing this user." })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Data.update(id, { name })
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was a problem updating this user." })
    })
});

//custom middleware

const validateUserId = function (req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
