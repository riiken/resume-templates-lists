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
    file_path: {
        type: String,
        required: true
    }
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
