import React from "react";
import { connect } from "react-redux";

class UserDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.id;
  }

  addDeleteUserFromFavourites = async (user, value) => {
    user.isFavourite = value;
    let favouriteUserList = {};
    if (window.localStorage.getItem("user")) {
      favouriteUserList = JSON.parse(window.localStorage.getItem("user"));
    }
    if (value) {
      favouriteUserList[user.id] = user;
    } else {
      delete favouriteUserList[user.id];
    }
    window.localStorage.setItem("user", JSON.stringify(favouriteUserList));
    this.setState({});
  };

  render() {
    const userDetails = this.props.userData[this.userId];
    console.log("UserDetails", userDetails, this.props.userData);
    const favList =
      window.localStorage.getItem("user") &&
      JSON.parse(window.localStorage.getItem("user"));
    return userDetails ? (
      <div className="container">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={userDetails.avatar}
            className="card-img-top"
            alt="..."
            style={{ borderRadius: "50%" }}
          />
          <div className="card-body">
            <h5 className="card-title">
              {userDetails.first_name} {userDetails.last_name}
            </h5>
            <p className="card-text">{userDetails.email}</p>
            {favList[this.userId]?.isFavourite ? (
              <button
                className="btn btn-danger"
                onClick={() =>
                  this.addDeleteUserFromFavourites(userDetails, false)
                }
              >
                Delete Contact from favourites
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.addDeleteUserFromFavourites(userDetails, true)
                }
              >
                Add to Favourites
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      "No user available of this id"
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapStateToProps)(UserDetailView);
