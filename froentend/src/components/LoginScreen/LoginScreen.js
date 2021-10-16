import {
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import Loding from "../Shared/Loding";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../Shared/actions/userAction";

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
  const history = useHistory()

  // create useState for all the fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // using Redux
  const dispatch = useDispatch()

  const userLogin = useSelector((state )=> state.userLogin)
  const { loading, error, userInfo} = userLogin

  // rediicet to login page using hooks
  useEffect(() => {
    if(userInfo){
      history.push('/mynotes')
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    toast.error(error)
  };

  


  return (
    <MainScreen title="LOGIN">
       
        {loading && <Loding/> }
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
      {error && <ToastContainer/> }
    </MainScreen>
  );
};
