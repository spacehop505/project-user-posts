import React, { useState, useEffect, useCallback } from "react";
import Navbar from './components/Navbar/Navbar'
import BodyProfile from './components/Profile/BodyProfile'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BodyPost from './components/Post/BodyPost';
import BodyLogin from './components/Login/BodyLogin';
import axios from 'axios';
import './App.css'

function App() {
  const api = axios.create({
    baseURL: 'http://localhost:4000/'
  });

  const [getEmail, setEmail] = useState('');
  const [getPassword, setPassword] = useState('');


  const [getToken, setToken] = useState(false);
  const [getUserId, setUserId] = useState(false);

  const login = async (email, password) => {
    await api.post(`/login/`, { email: email, password: password })
      .then(responce => {
        setToken(responce.data.success.accessToken)
        setUserId(responce.data.success.userId)
        localStorage.setItem('userData', JSON.stringify({ userId: responce.data.success.userId, token: responce.data.success.accessToken }))
      }).catch(err => {
        setToken(false)
        setUserId(false)
      })
  }



  const logout = () => {
    localStorage.removeItem('userData');
  }


  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('userData'))
    if (storageData && storageData.token) {
      console.log('getToken', getToken)
      console.log('storageData.token', storageData.token)
      console.log('storageData.userId', storageData.userId)
      setToken(storageData.token)
      setUserId(storageData.userId)
    } else {
      setToken(false)
      setUserId(false)
      console.log('false test')
    }
  }, []);


  let routes;

  if (getToken) {
    routes = (
      <Switch>
        <Route path={`/profile/`} exact>
          <div className="main-margin">
            <div className="is-centered">
              <div className="is-size-px">
                <BodyProfile getToken={getToken} getUserId={getUserId}></BodyProfile>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/post/:postId" exact>
          <div className="main-margin">
            <div className="is-centered">
              <div className="is-size-px">
                <BodyPost></BodyPost>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/login/" exact>
          <Redirect to={`/profile`} />
        </Route>

        <Redirect to={`/profile`} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <div className="main-margin">
            <div className="is-centered">
              <div className="is-size-px">
                <BodyLogin login={login} getEmail={getEmail} setEmail={setEmail} getPassword={getPassword} setPassword={setPassword}></BodyLogin>
              </div>
            </div>
          </div>
        </Route>

        <Redirect to="/login" />

      </Switch>
    );
  }

  return (
    <div className="App">

      <div className="is-centered nav-background">
        <div className="is-size-px">
          <Navbar getToken={getToken} logout={logout}></Navbar>
        </div>
      </div>

      <BrowserRouter>

        {routes}



      </BrowserRouter>
    </div >
  );
}

export default App;
