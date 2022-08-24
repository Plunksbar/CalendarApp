const express = require('express')
const router = express.Router()
const Event = require('../models/event')

// All events route
router.get("/", async (req, res) => {
    let searchOptions = { }
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const events = await Event.find(searchOptions)
        res.render('events/index', { 
            events: events ,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New event route
router.get('/new', (req, res) => {
    res.render('events/new', { event: new Event()})
})

// Create event route
router.post('/', async (req, res) => {
    const event = new Event({
        name: req.body.name
    })
    try {
        const newEvent = await event.save()
        //res.redirect(`events/${newEvent.id}`)
        res.redirect(`events`)
    } catch {
        res.render('events/new', {
            event: event,
            errorMessage: 'Error creating the new author'
        })
    }
})


module.exports = router