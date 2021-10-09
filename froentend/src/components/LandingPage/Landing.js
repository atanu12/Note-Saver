import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing_main">
      <div className="main_content">
        <div className="main_header">
          <h1>Welcome To Note Saver</h1>
        </div>
        <div className="main_para">
          <p>Digital Way to save your Notes and get it from anyware </p>
        </div>
      
      <div className="main_button">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/regester"><button>Sign Up</button></Link>
      </div>
      </div>
    </div>
  );
};

export default Landing;
