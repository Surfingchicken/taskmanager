import React, { Component, useEffect, useState } from "react";
import Grid from"@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const Tasks =()=> {

    const [tasks, setTasks] = useState([]);
    
    function gettasks(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" ,
                       "Accept":"*/*" },
        } 
        fetch("http://localhost:8000/api/tasks", requestOptions)
         .then(response => response.json())
         .then (data => {setTasks(data)})
         
    }

    function checkbox(id,value){
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" ,
                "Accept":"application/json"},
            body: JSON.stringify({
            done: !value,
            id : id 
        }),
        } 
        fetch(`http://localhost:8000/api/update/${id}`, requestOptions)
        .then((response) =>{
            if(response.ok){
                gettasks()
                console.log(response)
            }
        })
        
         
    }    

    const deletetask=(id)=>{
        fetch(`http://localhost:8000/api/tasks/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok){
                    throw new Error('Something went wrong')
                }
                if(response.ok){
                    gettasks()
                    console.log(response)
                }
            })
        }
    
        
    useEffect(gettasks,[]);
    
    return(<>
        
        <Typography component='h4' variant="h4">Liste de vos tâches</Typography>
                  
        <Grid  container alignSelf={"center"} className="listtask" direction="column">
            <Grid container >
                <Grid item xs={2} alignSelf={"center"}>
                    id
                </Grid>
                <Grid item xs={6} alignSelf={"center"}>
                    tâche
                </Grid>
                <Grid item xs={2} alignSelf={"center"}>
                        complétée
                </Grid>
                <Grid item xs={2} alignSelf={"center"}>
                    supprimer                  
                </Grid>
            </Grid>
            {
                tasks.map(task => (
                    <Grid container key={task.id} >
                        <Grid item xs={2} alignSelf={"center"}>
                            {task.id}
                        </Grid>
                        <Grid item xs={6} alignSelf={"center"}>
                            {task.desc}
                        </Grid>
                        <Grid item xs={2} alignSelf={"center"}>
                                <Checkbox checked={task.done} value={task.done} name="done" onChange={()=>{checkbox(task.id,task.done)
                            }}/>
                        </Grid>
                        <Grid item xs={2} alignSelf={"center"}>
                            <IconButton aria-label="delete" onClick={() =>deletetask(task.id)}>
                                <DeleteIcon />
                            </IconButton>                      
                        </Grid>
                    </Grid>
                ))
            }
            </Grid>
        </>)
}

export default Tasks;