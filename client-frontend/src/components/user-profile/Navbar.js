import React from "react";
const Navbar = () => {
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
        <a href="/" className="level-item has-text-white">Profile</a>
      </div>
    </nav>
  );
}

export default Navbar;