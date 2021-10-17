import Navbar from './components/user-profile/Navbar'
import ProfileBody from './components/user-profile/ProfileBody'
import { BrowserRouter, Route, Link, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import PostBody from './components/user-post/PostBody';
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
                <ProfileBody></ProfileBody>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/post/:postId" exact>
          <div className="main-margin">
            <div className="is-centered">
              <div className="is-size-px">
                <PostBody></PostBody>
              </div>
            </div>
          </div>
        </Route>



      </BrowserRouter>
    </div >
  );
}

export default App;
