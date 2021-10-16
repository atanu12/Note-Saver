import axios from "axios";
import { toast } from "react-toastify";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGESTER_FAIL, USER_REGESTER_REQUEST, USER_REGESTER_SUCCESS } from "../constants/userConstance";

// Login Function
export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config ={
            headers:{
                "Content-type":"application/json",
            },
        };
        // calling the api
        const { data } = await axios.post("/api/users/login",{
            email, password
        },config);

        // if the login success
        dispatch({type: USER_LOGIN_SUCCESS, payload:data})
        
        // if the pocess is conpleted store the value in local storage
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
       dispatch({
           type:USER_LOGIN_FAIL,
           payload: error.response && error.response.data.message 
            ?error.response.data.message 
            :error.response
       })
      
    }   
}

// Logout Function
export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT})
}

// user regestration
export const regester = (name, email, password, pic) => async (dispatch) =>{
    try {
        dispatch ({type : USER_REGESTER_REQUEST})
        const config ={
          headers:{
              "Content-type":"application/json"
          },
        }

        const { data } = await axios.post("/api/users",{
        name, email,password,pic
        },config);

        dispatch({type: USER_REGESTER_SUCCESS, payload: data})

        localStorage.setItem("userInfo", JSON.stringify(data));
        
      } catch (error) {
          dispatch({
              type: USER_REGESTER_FAIL,
              payload: error.response && error.response.data.message 
              ?error.response.data.message 
              :error.response
          })
        
      }
}