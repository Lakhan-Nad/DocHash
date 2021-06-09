const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');


const User = require('../models/User');
const Contact = require('../models/file');


// @route GET api/files
// @desc Get logged in user ///files
// @access Private

router.get("/", auth, async (req, res) => {
    try {
        const user_file = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(user_file);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route Post api////files
// @desc Add new files
// @access Private

router.post("/", [auth,
    [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, filename, ipfsHash, file } = req.body;

        try {
            const newContact = new Contact({
                name,
                filename,
                ipfsHash,
                file,
                user: req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })

router.delete("/:id", auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'File not found' });

        //Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: 'file removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



module.exports = router;