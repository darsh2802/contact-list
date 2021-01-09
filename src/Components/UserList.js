import React from "react";
import { connect } from "react-redux";
import { setUserList } from "../actions";
import Pagination from "react-pagination-library";

import "react-pagination-library/build/css/index.css";
import axios from "axios";

class UserListView extends React.Component {
  state = {
    userData: [],
  };
  componentDidMount = async () => {
    await this.getUserList();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.url !== this.props.match.url) {
      await this.getUserList();
    }
  };

  getUserList = async (pageNo = 1) => {
    if (this.props.match && this.props.match.url.includes("favourites")) {
      let userData = [];
      if (window.localStorage.getItem("user")) {
        userData = Object.values(
          JSON.parse(window.localStorage.getItem("user"))
        );
        this.setState({ userData });
      } else {
        this.setState({ userData });
      }
    } else {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNo}`
      );
      if (response.status === 200) {
        this.props.setUserList(response.data.data);
        this.setState({
          userData: response.data.data,
          totalPages: response.data.total_pages,
          currentPage: pageNo,
        });
      }
    }
  };

  sort = (order, key = "first_name") => {
    const arr = [...this.state.userData];
    arr.sort(function compare(a, b) {
      let compareObj1 = a[key].toUpperCase();
      let compareObj2 = b[key].toUpperCase();
      let comparison = 0;

      if (compareObj1 > compareObj2) {
        comparison = 1 * order;
      } else if (compareObj1 < compareObj2) {
        comparison = -1 * order;
      }

      return comparison;
    });
    this.setState({ userData: arr });
  };

  changeCurrentPage = async (pageNo) => {
    await this.getUserList(pageNo);
  };

  renderPagination = () => {
    const { totalPages, currentPage } = this.state;
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changeCurrentPage={this.changeCurrentPage}
        theme="bottom-border"
      />
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.sort(1)}
            >
              Sort By A-Z
            </button>
          </div>
          <div className="col-lg-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.sort(-1)}
            >
              Sort By Z-A
            </button>
          </div>
          <div className="col-lg-4">
            {this.props.match.url.includes("favourites") ? (
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/")}
              >
                Go To User List
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/favourites")}
              >
                Go To Favourites
              </button>
            )}
          </div>
        </div>
        <div className="row pt-5">
          {this.state.userData.length ? (
            <React.Fragment>
              {this.state.userData.map((user) => (
                <div
                  className="row mt-5"
                  key={user.id}
                  onClick={() => this.props.history.push(`/users/${user.id}`)}
                >
                  <div className="col-lg-4">
                    <img
                      src={user.avatar}
                      key={user.avatar}
                      style={{ borderRadius: "50%" }}
                      alt={"..."}
                    />
                  </div>
                  <div className="col-lg-8">
                    <div className="col-lg-12">{`${user.first_name} ${user.last_name}`}</div>
                    <div className="col-lg-12">{user.email}</div>
                  </div>
                </div>
              ))}
              {!this.props.match.url.includes("favourites") &&
                this.renderPagination()}
            </React.Fragment>
          ) : (
            <div>No Data Available</div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { setUserList })(UserListView);
