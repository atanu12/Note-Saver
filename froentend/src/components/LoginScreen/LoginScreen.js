import {
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import ErrorHandler from "../Shared/ErrorHandler";
import Loding from "../Shared/Loding";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom Style
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "70vw",
    margin: "1rem 0px",
  },
  label: {
    fontWeight: "600",
  },
  button: {
    background: "#1565c0",
    color: "white",
    width: "10vw",
    "&:hover": {
      backgroundColor: "#78909c",
      color: "white",
    },
  },
  normal:{
      fontWeight:500,
  }
}));

export const LoginScreen = () => {
  const classes = useStyles();

  // create useState for all the fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [loding, setLoding] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
        const config ={
            headers:{
                "Content-type":"application/json"
            }
        }
        setLoding(true);

        // calling the api
        const { data } = await axios.post("/api/users/login",{
            email, password
        },config);

        // if the pocess is conpleted store the value in local storage
        console.log(data);
        localStorage.setItem("userInfo",JSON.stringify(data))
        setLoding(false)
    } catch (error) {
       setErrormsg(error.response.data.message)
       setLoding(false)
       toast.error(error.response.data.message,{
        position: "top-center",
        theme: "colored",
       })
    }
  };
  return (
    <MainScreen title="LOGIN">
       
        {loding && <Loding/> }
      <form onSubmit={submitHandler}>
        <div>
          <div><label className={classes.label}>Email</label></div>
          <TextField
            fullWidth
            className={classes.textField}
            placeholder="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
          <div><label className={classes.label}>Password</label></div>
          <TextField
            className={classes.textField}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            variant="outlined"
          />
        </div>
        <Button className={classes.button} type="submit">Submit</Button>
      </form>
      <div>
          <h4 className={classes.normal} >New User ? <NavLink to="/regester">Register Here</NavLink></h4>
      </div>
      {errormsg && <ToastContainer/> }
    </MainScreen>
  );
};
