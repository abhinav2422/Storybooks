const express = require('express');
const router = express.Router();

//Stories index
router.get('/', (req, res) => {
    res.render('stories/index');
});

//Add story form
router.get('/add', (req, res) => {
    res.render('stories/add');
});

module.exports = router;