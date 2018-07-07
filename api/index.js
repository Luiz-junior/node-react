const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/node_react');
require('./todo');

const Todo = mongoose.model('Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    return res.json(todos);
});

app.post('/todos', async (req, res) => {
    const todo = await Todo.create(req.body);
    return res.json(todo);
});

app.delete('/todos', async (req, res) => {
    const id = req.body._id;
    const todo = await Todo.findByIdAndRemove(id)
    return res.json(todo);
});

app.put('/todos', async (req, res) => {
    const id = req.body._id;
    const update = {$set: {text: req.body.text}}
    
    const todo = await Todo.findOneAndUpdate(id, update);
    return res.json(todo);
});

app.listen(9000, () => console.log('Server Funfando :D'));