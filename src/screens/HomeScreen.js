import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

import Loader from "../components/Loader";

const HomeScreen = () => {
  const match = useRouteMatch();

  const keyword = match.params.keyword;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(["id", "asc"]);

  const handleSortChange = (targetRow) => {
    if (targetRow === sortBy[0]) {
      const sortDir = sortBy[1] === "asc" ? "desc" : "asc";
      setSortBy([targetRow, sortDir]);
    } else {
      setSortBy([targetRow, "asc"]);
    }
  };

  const sort = (updPosts) => {
    const sortDir = sortBy[1] === "asc" ? -1 : 1;

    updPosts.sort((a, b) => {
      let fa = typeof a[sortBy[0]] === "string" ? a[sortBy[0]].toLowerCase() : a[sortBy[0]];
      let fb = typeof b[sortBy[0]] === "string" ? b[sortBy[0]].toLowerCase() : b[sortBy[0]];

      if (fa < fb) {
        return sortDir;
      }
      if (fa > fb) {
        return -sortDir;
      }
      return 0;
    });
    return updPosts;
  };

  const fetchPosts = async () => {
    const { data: allPosts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let currUserId = null,
      currUserName = "";

    for (const p of allPosts) {
      if (currUserId && p["userId"] === currUserId) {
        p["userName"] = currUserName;
      } else {
        const { data: user } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${p["userId"]}`
        );
        currUserName = user.name;
        currUserId = p["userId"];
        p["userName"] = user.name;
      }
    }
    if (keyword) {
      const filteredPosts = allPosts.filter(
        (p) =>
          p.title.toLowerCase().search(keyword) !== -1 ||
          p.body.toLowerCase().search(keyword) !== -1 ||
          p.userName.toLowerCase().search(keyword) !== -1
      );
      setPosts(sort(filteredPosts));
    } else {
      setPosts(sort(allPosts));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [keyword, sortBy]);

  return (
    <>
      {keyword && (
        <Link to={"/"} className="btn">
          GO BACK
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : (
        !!posts.length && (
          <div className="my-2">
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSortChange("id")}>
                      ID <i className="fa fa-sort" aria-hidden="true"></i>
                    </th>
                    <th onClick={() => handleSortChange("title")}>
                      TITLE <i className="fa fa-sort" aria-hidden="true"></i>
                    </th>
                    <th onClick={() => handleSortChange("body")}>
                      MESSAGE <i className="fa fa-sort" aria-hidden="true"></i>
                    </th>
                    <th onClick={() => handleSortChange("userName")}>
                      AUTHOR <i className="fa fa-sort" aria-hidden="true"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.body}</td>
                      <td>{p.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default HomeScreen;
