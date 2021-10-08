import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import MainScreen from "../MainScreen/MainScreen";

// custom Style
const useStyles = makeStyles((theme)=>({
  textField:{
      width:'70vw',
      margin:'1rem 0px'
  },
  label:{
      fontWeight:'600'
  },
  button:{
      background:'#1565c0',
      color:'#bbdefb',
      width:'10vw',
      "&:hover": {
          backgroundColor: '#78909c',
          color:'white',
        }
  }
}))
const RegesterScreen = () => {
  const classes = useStyles()

  // create useState for all the fields
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loding, setLoding] = useState("");


  return (
    <MainScreen title="REGISTER">
      <div className="regester_main">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <label className={classes.label}>Name</label>
          <TextField fullWidth className={classes.textField} id="outlined-basic" label="Name" variant="outlined"  />
        </div>
        <div>
        <label className={classes.label}>Email</label>
          <TextField fullWidth className={classes.textField} id="outlined-basic" label="Email" variant="outlined" />
        </div>
        <div>
        <label className={classes.label}>Password</label>
          <TextField type="password" fullWidth className={classes.textField} id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <div>
        <label className={classes.label}>Confirm Password</label>
          <TextField type="password" fullWidth className={classes.textField} id="outlined-basic" label="Confirm Password" variant="outlined" />
        </div>
        <div>
        <label className={classes.label}>Upload Pic</label>
          <input type="file"  className={classes.textField} variant="outlined" accept="image/*" />
        </div>

        <div >
            <Button className={classes.button}>Sign Up</Button>
        </div>
      </Box>
    </div>
    </MainScreen>
  );
};

export default RegesterScreen;
