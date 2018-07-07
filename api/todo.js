const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

mongoose.model('Todo', TodoSchema); // deixa o model disponivel para toda a aplicação