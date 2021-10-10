import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MainScreen from "../MainScreen/MainScreen";
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

  // create useState for all the fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState( "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [picmsg, setPicmsg] = useState("");
  const [matchpass, setMatchpass] = useState("")
  const [error, setError] = useState("");
  const [loding, setLoding] = useState("");

  // formdata submit and api call
  const handelSubmit = async (e)=>{

    
    e.preventDefault();
    // console.log(name, email, pic,password,confirmpassword);
  // check password
    setLoding(true)
    if( password !== confirmpassword){
      setMatchpass('Password Do Not Match')
      toast.error('Password Do Not Match')
      setLoding(false)
    }else{
      // cll api
      setMatchpass(null)
    try {
      const config ={
        headers:{
            "Content-type":"application/json"
        }
    }
    setLoding(true)
    const { data } = await axios.post("/api/users",{
      name, email,password,pic
    },config);
    console.log(data);
    localStorage.setItem("userDetails", JSON.stringify(data));
    setLoding(false)
      
    } catch (error) {
      setError(error.response.data.message);
      setLoding(false);
      toast.error(error.response.data.message,{
        position: "top-center",
        theme: "colored",
       })
      
    }
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
        { loding && <Loding/> }
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
