const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    classe: {
        type: Number,
        required: true,
    },
    level:{
        type: Number,
        default: 1
    }
    
}, {
    timestamps: true,
});

module.exports = model('Character', CharacterSchema);