import React, { useState, useEffect } from "react";

const LoginForm = ({ login, setEmail, setPassword, getEmail, getPassword }) => {

  return (
    <div className=' m-0 mb-4 '>
      <div className=' p-0   '>
        <input className="input is-success is-small" type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="input is-success is-small" type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="m-0 ">
        <button className="button is-warning  is-small" onClick={() => { login(getEmail, getPassword) }}>Login</button>
      </div>

    </div>
  )
}

export default LoginForm;