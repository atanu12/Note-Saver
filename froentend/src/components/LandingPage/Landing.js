import React from "react";
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
          <button href='/login'>Login</button>
          <button href='/signup'>Sign Up</button>
      </div>
      </div>
    </div>
  );
};

export default Landing;
