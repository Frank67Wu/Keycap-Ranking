const express = require('express')
const {
    createKeycap,
    getKeycaps,
    getKeycap,
    deleteKeycap,
    updateKeycap,
    getRandomKeycap,
    deleteAll
} = require('../controllers/keycapControllers')

const router = express.Router()

// GET a random keycap set
router.get('/random' , getRandomKeycap)

// GET all keycaps sets
router.get('/', getKeycaps)

// GET one keycaps set
router.get('/:id', getKeycap)

// POST a new keycap set
router.post('/', createKeycap)


router.delete('/deleteAll', deleteAll)
// DELETE a keycap set
router.delete('/:id', deleteKeycap)



// UPDATE a keycap set
router.patch('/:id', updateKeycap)
module.exports = router