const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');

require("./config/db");
const Todo = require("./model/todos.model");
const app = express();
app.use(express.json());
app.use(cors({
    // origin: "",
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/todos", async(req, res) => {
    const todos = await Todo.find({});

    if(todos){
        let arr = [];
        todos.forEach(todo => arr.push({item: todo.item, color: todo.color, id: todo.id}));
        res.send(arr);
    } else res.send("No more todos");
})

app.post("/todos", async (req, res) => {
    const { item, color, id } = req.body;
    const todo = new Todo({item, color, id});
    await todo.save();
    const todos = await Todo.find({});
    if(todos){
        let arr = [];
        todos.forEach((todo) => arr.push({id: todo.id, item: todo.item, color: todo.color}));
        res.send(arr);
    } else res.send("No more todos");
})

app.delete("/todos/:id", async(req, res) => {
    await Todo.deleteOne({id});
    await Todo.findById
    res.send("Deleted Successfully");
})


const url = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f38271693emshd857f9dba8eb930p1b35a8jsn6df3d14db439',
		'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
	}
};

// console.log(quotes());
app.listen(3000, () => console.log("Listening on port 3000"));
