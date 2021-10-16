import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import MainScreen from "../MainScreen/MainScreen";
import { regester } from "../Shared/actions/userAction";
import Loding from "../Shared/Loding";

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
    color: "#bbdefb",
    width: "10vw",
    "&:hover": {
      backgroundColor: "#78909c",
      color: "white",
    },
  },
}));
const RegesterScreen = () => {
  const classes = useStyles();
  const history = useHistory()

  // create useState for all the fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [pic, setPic] = useState( "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [picmsg, setPicmsg] = useState("");

  // calling the reducer

  const dispatch = useDispatch();
  const userRegester = useSelector(state => state.userRegester)
  const {loading, error, userInfo} = userRegester;

  // redrite to login scren
  useEffect(()=>{
    if(userInfo){
      history.push('/')
    }
  },[history, userInfo])

  // formdata submit and api call
  const handelSubmit = async (e) =>{
    e.preventDefault();
    if(password !== confirmpassword){
      setMatchpass('Password do not Match')
    }else{
      dispatch(regester(name, email, password, pic))
    }
  }
  // save the upload pics
  const uploadPic = (pics) => {
    if(!pics){
      return setPicmsg('Please Select an Image')
      toast.error('Please Select an Image')
    }
    setPicmsg(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset',"note-saver")
      data.append('cloud_name',"social-app-atanu")
      fetch(' https://api.cloudinary.com/v1_1/social-app-atanu/image/upload',{
        method:'post',
        body:data,
      }).then((rest)=> rest.json()).then((data)=>{
        setPic(data.url.toString())
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      return setPicmsg('Please Select an Image')
      toast.error('Please Select an Image')
    }
  }

  return (
    <MainScreen title="REGISTER">
      <div className="regester_main">
        { matchpass && <ToastContainer/>  }
        { error && <ToastContainer/>  }
        { picmsg && <ToastContainer/>  }
        { loading && <Loding/> }
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handelSubmit}
        >
          <div>
            <label className={classes.label}>Name</label>
            <TextField
              type="text"
              className={classes.textField}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div>
            <label className={classes.label}>Email</label>
            <TextField
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={classes.label}>Password</label>
            <TextField
              type="password"
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className={classes.label}>Confirm Password</label>
            <TextField
              type="password"
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              value={confirmpassword}
              onChange={(e)=> setConfirmpassword(e.target.value)}
            />
          </div>
          <div>
            <label className={classes.label}>Upload Pic</label>
            <input
              type="file"
              className={classes.textField}
              variant="outlined"
              accept="image/*"
              onChange={(e)=> uploadPic(e.target.files[0])}
              
            />
          </div>

          <div>
            <Button type="submit" className={classes.button}>Sign Up</Button>
          </div>
        </Box>
      </div>
    </MainScreen>
  );
};

export default RegesterScreen;
