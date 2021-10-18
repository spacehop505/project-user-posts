import React from "react";

const Profile = ({ userInfo }) => {

  return (
    <div className="main-top border-body has-text-centered">
      <div className="columns is-flex is-centered m-0 mt-2">
        <figure className="image is-128x128">
          <img className="is-rounded" alt="" src="https://bulma.io/images/placeholders/128x128.png"></img>
        </figure>
      </div>
      <div>
        <p className="is-size-3 has-text-weight-bold">{userInfo.username}</p>
      </div>
      <ul >
        <li className="follow pt-2 pb-2">
          <h1 className="is-size-4 has-text-grey">Following</h1>
          <p className="has-text-weight-bold">{userInfo.following.length}</p>
        </li>
        <li className="follow pt-2 pb-2">
          <h1 className="is-size-4 has-text-grey">Followers</h1>
          <p className="has-text-weight-bold">{userInfo.followers.length}</p>
        </li>
      </ul>
    </div >
  );
}

export default Profile;