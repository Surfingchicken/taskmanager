import React, { Component, useState } from "react";
import Button from"@mui/material/Button";
import Grid from"@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl/FormControl";




const CreateTaskPage = ()=>{
    const [field, setField] = useState("");
    const handlenewtask=()=>{
        console.log(field);
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                desc: field.desc,
            }),
            };
            fetch("http://localhost:8000/api/create-task", requestOptions)
            .then((response) => {
                if(response.ok){
                    response.json()
                    window.location.reload()
                    
                }
                })
            .then((data) => console.log(data));
        }
        

    return (<>
            <Typography component='h5' variant="h5">Ajouter une Tâche</Typography>
            <FormControl component="fieldset">
                <Grid container className="createform" direction="row">
                    <Grid item xs={10} alignSelf={"center"}>
                        <FormControl>
                            <TextField required={true}
                                type="text" name="desc" label="description" onChange={e => setField({ desc: e.target.value })} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={2} alignSelf={"center"}>
                        <Button color="secondary" variant="contained" onClick={handlenewtask}>add</Button>
                    </Grid>
                </Grid>

            </FormControl>

    </>);
}
export default CreateTaskPage;