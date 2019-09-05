const express = require('express');

// Import Data
const UserData = require('./userDb');
const PostData = require('../posts/postDb');
let nextId = 10;

const router = express.Router();
router.use(express.json());

router.post('/', validateUser, (req, res) => {
  const name = req.body;

  UserData.insert(name)
    .then(user => {
      res.status(201).json(name)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error adding a user." })
    })
});

router.post('/:id/posts', (req, res) => {
  const post = req.body

  PostData.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding post." })
    })
});

router.get('/', (req, res) => {
  UserData.get()
    .then(names => {
      res.status(200).json(names)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error uploading all of the DB resources." })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  console.log("GET USER")
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  console.log("GET USER/'S POSTS")
  const { id } = req.params;

  UserData.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error getting this user/'s posts."})
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  UserData.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      res.status(500).json({ error: "There was a problem removing this user." })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  UserData.update(id, { name })
    .then(updated => {
      res.status(200).json(updated)
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  UserData.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: "A user with this ID does not exist." })
      }
    })
};

function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "A name is required."})
  }
  if (typeof name !== "string") {
    return res.status(400).json({ error: "A name must be a string." })
  }
  next();
};

function validatePost(req, res, next) {
  const { id: user_id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Post requires a body." })
  }
  if (!text) {
    return res.status(400).json({ error: "Post requires text." })
  }
  next();
};

module.exports = router;
