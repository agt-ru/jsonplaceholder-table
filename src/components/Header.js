import React from "react";
import { Link, Route } from "react-router-dom";

import SearchBox from "../components/SearchBox";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="navbar">
      <div className="container flex">
        <h1 className="logo">
          <Link to={"/"}>Posts</Link>
        </h1>
        <Route
          render={({ history, location, match }) => (
            <SearchBox history={history} location={location} match={match} />
          )}
        />
      </div>
    </div>
  );
};

export default Header;
