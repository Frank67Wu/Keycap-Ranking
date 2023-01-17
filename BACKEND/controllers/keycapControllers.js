const { default: mongoose } = require('mongoose')
const Keycap = require('../models/keycapModels')



const getRandomKeycap = async(req, res) => {
    const count = await Keycap.countDocuments()
    console.log(count)
    const random = Math.floor(Math.random() * count)

    const keycap = await Keycap.findOne().skip(random)
    res.status(200).json(keycap)
}


// get all keycaps

const getKeycaps = async (req, res) => {
    const keycaps = await Keycap.find({})

    res.status(200).json(keycaps)
}

// get one keycap set

const getKeycap = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Keycap set"})
    }

    const keycap = await Keycap.findById(id)

    if (!keycap) {
        return res.status(404).json({error: "No such Keycap set"})
    }

    res.status(200).json(keycap)
}


// create a new keycap set

const createKeycap = async (req, res) => {
    const {name, designer, gbStart, gbEnd} = req.body

    try {
        const keycap = await Keycap.create({name, designer, gbStart, gbEnd})
        res.status(200).json(keycap)
    } catch (error) {
        res.status(400).json({error: error.message})
    } 
}

// delete a keycap set

const deleteKeycap = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such keycap set"})
    }

    const keycap = await Keycap.findOneAndDelete({_id: id})
    if(!keycap) {
        return res.status(404).json({error: "No such keycap set"})
    }

    res.status(200).json(keycap)
}

// update a keycap set

const updateKeycap = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such keycap set"})
    }

    const keycap = await Keycap.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!keycap) {
        return res.status(404).json({error: "No such keycap set"})
    }

    res.status(200).json(keycap)
}

module.exports = {
    createKeycap,
    getKeycap,
    getKeycaps,
    deleteKeycap,
    updateKeycap,
    getRandomKeycap
}