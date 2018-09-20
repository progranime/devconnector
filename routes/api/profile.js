const express = require('express')
const router = express.Router()

// @router  GET api/prfolie/test
// @desc    Tests prfolie route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}))

module.exports = router