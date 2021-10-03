import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Pagination from "./Pagination";
import { FaSearch } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? list
    : list.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="friends-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Friend List</h3>
        <div className="form-control">
          <input
            type="text"
            className="friends"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="search-icon">
            <FaSearch />
          </div>
        </div>
        <div className="form-control">
          <input
            type="text"
            className="friends"
            placeholder="Enter your friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            enter
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="friends-container">
          <List items={currentPosts} removeItem={removeItem} />
          {results.length > 4 && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={results.length}
              paginate={paginate}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default App;
