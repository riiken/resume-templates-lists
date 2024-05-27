const express = require('express');
const router = express.Router();
const Template = require('../model/templateModel');
const path = require('path');
const fs = require('fs');

router.get('/',(req,res)=>{
    res.json({message:"Hello"});
})
// Endpoint to get the list of templates
router.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        // Construct response object with template name and content
        const response = templates.map(template => ({
            template: template.name,
            content: fs.readFileSync(path.join(__dirname, '../', template.file_path), 'utf8')
        }));
        res.json(response);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get a specific template file
router.get('/templates/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (template) {
            res.sendFile(path.join(__dirname, '../', template.file_path));
        } else {
            res.status(404).send('Template not found');
        }
    } catch (err) {
        console.error('Error fetching template:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to add a new template
router.post('/templates', async (req, res) => {
    const { name, description, file_path } = req.body;

    if (!name || !description || !file_path) {
        return res.status(400).send('All fields are required');
    }

    const template = new Template({ name, description, file_path });

    try {
        await template.save();
        res.status(201).send('Template added successfully');
    } catch (err) {
        console.error('Error adding template:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to render a specific template as JSON
router.get('/templates/render/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (template) {
            const filePath = path.join(__dirname, '../', template.file_path);
            const content = fs.readFileSync(filePath, 'utf8');
            res.json({ template: template.name, content });
        } else {
            res.status(404).send('Template not found');
        }
    } catch (err) {
        console.error('Error rendering template:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
