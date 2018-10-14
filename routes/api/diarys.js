const express = require('express');
const router = express.Router();

// Diary Model
const Diary = require('../../models/Diary');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Diary.find()
    .sort({ date: -1 })
    .then(diarys => res.json(diarys));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newDiary = new Diary({
    name: req.body.name,
    checked:req.body.checked
  });

  newDiary.save().then(diary => res.json(diary));
});

module.exports = router;
