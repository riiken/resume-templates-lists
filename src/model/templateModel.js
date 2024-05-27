const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String, // Store template content as a string
        required: true
    }
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
