const { mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    item: {
        type: 'String', 
        require: true
    },
    color: {
        type: 'String', 
        require: true
    }
})

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;