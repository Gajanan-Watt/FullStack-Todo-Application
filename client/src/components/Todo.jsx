import React, { useEffect, useState } from 'react'
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';



import "./Todo.css";
import { IconButton, TextField, Typography } from '@mui/material';

export default function Todo() {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [ flag, setFlag ] = useState(false);
    const [ call, setCall ] = useState(false);
    const [ quote, setQuote ] = useState({});
    let arr = ["#D6EAF8", "#FDEBD0", "#D6EAF8", "#FDF5E6", "#D4EFDF", "#F2D7D5", "#D6EAF8", "#FCF3CF", "#D4EFDF", "#FDE3A7", "#D6EAF8", "#F9E79F", "#D6EAF8", "#FDE8D7", "#D4EFDF", "#FAD7A0", "#D6EAF8", "#F9E79F", "#D8DAE8", "#F8C1A0"]
    
    useEffect(() => {
        async function fetchTodos(){
            const Todos = await fetch("https://todo-backend-eeoq.onrender.com/todos")
            const res = await Todos.json();
            setTodos([...res]);
        }
        fetchTodos();
    }, [call]);
    useEffect(() => {
        var tempArr = [];
        function quote(){
            fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then(data => {
                // Select a random quote object from the data array
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomQuote = data[randomIndex];
                // return randomQuote
                // tempArr.push(randomQuote);
                // console.log(randomQuote);
                setQuote(randomQuote)

                // console.log("tempArr", tempArr);
                // console.log(randomQuote); // You can modify this line to use the quote object as needed
            })
            .catch(error => {
                console.log("An error occurred:", error);
            });
        }
        quote()
    }, []);
    const handleChange = (event) => {
        setTodoText(event.target.value);
        if(todoText){
            setFlag(false);
        } else {
            setFlag(true);
        }
    }

    const handleDone = (id) => {
        let temp;
        console.log("id", id);
        temp = todos.filter((el) => el.id == id)
        console.log("temp", temp);
        setCompletedTodo([...completedTodo, ...temp]);
        let arr;
        arr = todos.filter((el) => el.id != id);
        setTodos([...arr]);
        console.log("completedTodo", completedTodo);
        
    }

    const handleRemove = (item) => {
        let arr = completedTodo.filter((el) => el.item != item);
        setCompletedTodo([...arr])
        axios.delete(`https://todo-backend-eeoq.onrender.com/todos/${item}`).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSubmit = () => {
        axios.post("https://todo-backend-eeoq.onrender.com/todos", {
            id: Date.now(),
            item: todoText,
            color: arr[Math.ceil(Math.random() * arr.length)]
        }).then((res) => {
            console.log(res);
            setCall((prev) => !prev);
        })
        setTodoText('');
    }

    
  return (
    <div>
        <div className="container">
            <Box sx={{ boxShadow: 3 }} className='container1'>
                <p className='headerText'>EXPERIENCE NEW WAY TO MANAGE YOUR TASKS</p>
                <div className='inputBox'>
                    <TextField sx={{flexGrow: 1}} id="outlined-basic" value={todoText} label="Task" variant="outlined"  onChange={handleChange}/>
                    <Button variant="contained" disabled={!todoText} className='inputBoxButton' startIcon={<AddIcon />} onClick={handleSubmit}>
                        Add Task
                    </Button>
                </div>

                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <hr className='hr'></hr>
                <div>&nbsp;</div>
                <div>&nbsp;</div>

                <div className='quoteDiv'>
                     <FormatQuoteIcon className='rotate1'/> <h3>{quote.text}</h3> <FormatQuoteIcon className='rotate2'/>
                </div>
                <div>-{quote.author}</div>
                                
            </Box>
            <div className='container2'>
                <Box sx={{ boxShadow: 3 }} className='container2_1'>
                    <p className='header1'>Pending Tasks</p>
                    <div className='container2_1_1'>
                        {
                            todos.map((el) => (
                                <div className='card' style={{backgroundColor: `${el.color}`}}>
                                    <h3>{el.item}</h3>
                                    <IconButton className='iconButton' onClick={() => handleDone(el.id)}>
                                        <CheckIcon/>
                                    </IconButton>
                                </div>
                            ))
                        }
                    </div>
                </Box>
                <Box sx={{ boxShadow: 3 }} className='container2_1'>
                    <p className='header1'>Completed Tasks</p>
                    <div className='container2_1_1'>
                        {
                            completedTodo?.map((el) => (
                                <Box sx={{ boxShadow: 3 }} className='card' style={{backgroundColor: `${el.color}`}}>
                                    <h3>{el.item}</h3>
                                    <IconButton className='iconButton' onClick={() => handleRemove(el.item)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Box>
                            ))
                        }
                    </div>
                </Box>
            </div>
        </div>
    </div>
  )
}
