import React from "react";
const Navbar = ({ logout, getToken }) => {



  return (
    <nav className="level  pt-2 pb-2 ">
      <div className="level-left ">
        <div className="level-item">
          <div className="field has-addons">
            <p className="control"> <input className="input" type="text" placeholder="Find User" /></p>
            <p className="control"> <button className="button">Search</button> </p>
          </div>
        </div>
      </div>

      <div className="level-right ">
        <a href="/" className="level-item has-text-white">Home</a>
        <a href="/profile" className="level-item has-text-white">Profile</a>

        {!getToken && (<a href="/login" className="level-item has-text-white">Login</a>)}

        {getToken && <a href="/logout" className="level-item has-text-white" onClick={logout}>Logout</a>}
      </div>
    </nav>
  );
}

export default Navbar;