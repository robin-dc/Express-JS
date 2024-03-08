const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json("GET /colors")
})
router.get('/:name', (req, res) => {
    const name = req.params.name;
    res.json(`GET /colors/${name}`)
})

module.exports = router
