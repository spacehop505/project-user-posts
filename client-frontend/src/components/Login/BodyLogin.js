import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginForm from "./LoginForm";
const PostBody = ({ login, getEmail, setEmail, getPassword, setPassword }) => {
  return (
    <main>
      <div className="row">

        <div className="column1">
          <div className="pl-3">
            <div className="has-background-white">
              <div className="main-top">
                <div>EMPTY</div>
              </div>
            </div>
          </div>
        </div>

        <div className="column2">
          <div className="pl-4  pr-4">
            <div className="main-top border-body has-background-white p-4 ">

              <LoginForm
                login={login}
                getEmail={getEmail}
                setEmail={setEmail}
                getPassword={getPassword}
                setPassword={setPassword}
              ></LoginForm>
            </div>
          </div>
        </div>

        <div className="column1">
          <div className="pl-3">
            <div className="has-background-white">
              <div className="main-top">
                <div>EMPTY</div>
              </div>
            </div>
          </div>
        </div>

      </div >

    </main>
  );
}


export default PostBody;