import Navbar from './components/user-profile/Navbar'
import Body from './components/Body'
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
function App() {
  return (
    <div className="App">

      <div className="is-centered nav-background">
        <div className="is-size-px">
          <Navbar></Navbar>
        </div>
      </div>

      <BrowserRouter>

        <Route path="/" exact>
          <Redirect to='/profile' exact></Redirect>
        </Route>

        <Route path="/profile" exact>
          <div className="main-margin">
            <div className="is-centered">
              <div className="is-size-px">
                <Body></Body>
              </div>
            </div>
          </div>
        </Route>

      </BrowserRouter>
    </div >
  );
}

export default App;
