import { Box, Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, makeStyles, TextField } from "@material-ui/core";
import { set } from "mongoose";
import React,{useState} from "react";
import MainScreen from "../MainScreen/MainScreen";

// custom Style
const useStyles = makeStyles((theme) => ({
    textField: {
        width: '70vw',
        margin: '1rem 0px'
    },
    label: {
        fontWeight: '600'
    },
    button: {
        background: '#1565c0',
        color: '#bbdefb',
        width: '10vw',
        "&:hover": {
            backgroundColor: '#78909c',
            color: 'white',
        }
    }
}))

export const LoginScreen = () => {
    const classes = useStyles();

    // create useState for all the fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loding, setLoding] = useState("");

    const submitHandler =(e)=>{
        e.preventDefault()
        console.log(email, password)
    }
    return (
        <MainScreen title="Login">
            <form onSubmit={submitHandler}>
                <div>
                    <TextField type='email' placeholder="Email" value={email} onClick={(e)=>setEmail(e.target.value)} label="Name" variant="outlined" />
                </div>
                <div>
                    <TextField type='password' value={password} onClick={(e)=>setPassword(e.target.value)} label="Name" variant="outlined" />
                </div>
               <button type='submit'>Submit</button>
            </form>
        </MainScreen>
    );
};
