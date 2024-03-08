const express = require('express')
const router = express.Router()


router.post('/:name/css-styles', (req, res) => {
    const name = req.params.name
    res.json(`POST /colors/${name}/css-styles`)
})

router.delete('/:name/css-styles/:style', (req, res) => {
    const name = req.params.name
    const style = req.params.style
    res.json(`DELETE /colors/${name}/css-styles/${style}`)
})

module.exports = router
