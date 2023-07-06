import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';




import "./Todo.css";
import { IconButton, TextField, Typography } from '@mui/material';

export default function Todo() {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    let arr = ["#D6EAF8", "#FDEBD0", "#D6EAF8", "#FDF5E6", "#D4EFDF", "#F2D7D5", "#D6EAF8", "#FCF3CF", "#D4EFDF", "#FDE3A7", "#D6EAF8", "#F9E79F", "#D6EAF8", "#FDE8D7", "#D4EFDF", "#FAD7A0", "#D6EAF8", "#F9E79F", "#D8DAE8", "#F8C1A0"]

    const handleChange = (event) => {
        setTodoText(event.target.value);
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

    const handleRemove = (id) => {
        let arr = completedTodo.filter((el) => el.id != id);
        setCompletedTodo([...arr])
    }

    const handleSubmit = () => {
        setTodos([...todos, {
            id: Date.now(),
            item: todoText,
            color: arr[Math.ceil(Math.random()*arr.length)]
        }])
        console.log("todos", todos);
    }
    
  return (
    <div>
        <div className="container">
            <div className='container1'>
                <p className='headerText'>EXPERIENCE NEW WAY TO MANAGE YOUR TASKS</p>
                <div className='inputBox'>
                    <TextField sx={{flexGrow: 1}} id="outlined-basic" label="Task" variant="outlined"  onChange={handleChange}/>
                    <Button variant="contained" className='inputBoxButton' startIcon={<AddIcon />} onClick={handleSubmit}>
                        Add Task
                    </Button>
                </div>
                                
            </div>
            <div className='container2'>
                <div className='container2_1'>
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
                </div>
                <div className='container2_1'>
                    <p className='header1'>Completed Tasks</p>
                    <div className='container2_1_1'>
                        {
                            completedTodo?.map((el) => (
                                <div className='card' style={{backgroundColor: `${el.color}`}}>
                                    <h3>{el.item}</h3>
                                    <IconButton className='iconButton' onClick={() => handleRemove(el.id)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
