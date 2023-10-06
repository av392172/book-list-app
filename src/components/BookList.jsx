import React, { useEffect, useState } from "react";
import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import BookForm from "./BookForm";
import { setSelecedBook } from "../redux/actions/bookAction";

function BookList() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const resultList = useSelector((state) => state.resultList);
  const searchQueryEntered = useSelector((state) => state.searchQueryEntered);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState();
  const [currentFilter, setCurrentFilter] = useState("");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setList(searchQueryEntered ? resultList : bookList);
  }, [searchQueryEntered, resultList, bookList]);
  const sortOptions = ["id", "title", "author", "country", "language", "year"];
  const listSort = (arr, element) => {
    if (arr.length > 0) {
      const newList = [...arr];
      if (element === "id" || element === "year") {
        newList.sort((a, b) => {
          return a[element] - b[element];
        });
      } else {
        newList.sort((a, b) => {
          let x = a[element].toLowerCase();
          let y = b[element].toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
        });
      }
      return newList;
    }
  };
  const handleSort = (e) => {
    const element = e.target.value;
    setSortValue(element);
    if (currentFilter.length) {
      setFilteredList(listSort(filteredList, element));
    } else {
      setList(listSort(list, element));
    }
  };
  const handleFilter = (country) => {
    currentFilter === country
      ? setCurrentFilter("")
      : setCurrentFilter(country);
    if (list.length > 0) {
      if (country === "India" || country === "UK") {
        const newList = list.filter(
          (item) => item.country.toLowerCase() === country.toLowerCase()
        );
        setFilteredList(newList);
      } else {
        const newList = list.filter(
          (item) =>
            item.country.toLowerCase() !== "india" &&
            item.country.toLowerCase() !== "uk"
        );
        setFilteredList(newList);
      }
    }
  };
  const renderedList = currentFilter.length ? filteredList : list;
  const handleEditBook = (book) => {
    setModal(true);
    dispatch(setSelecedBook({ ...book, type: "edit" }));
  };
  return (
    <>
      {modal && <BookForm setModal={setModal} />}
      <div className="topContainer">
        <div className="featureContainer">
          <h5>Sort By:</h5>
          <select
            onChange={handleSort}
            value={sortValue}
            style={{ width: "60%", borderRadius: "2px" }}
          >
            <option>Please select a value</option>
            {sortOptions.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="featureContainer">
          <h5>Country Filter:</h5>
          <div className="filterButtonContainer">
            <button
              style={
                currentFilter === "India"
                  ? { backgroundColor: "#d3d3d3", border: "1px solid gray" }
                  : {}
              }
              onClick={() => handleFilter("India")}
            >
              India
            </button>
            <button
              style={
                currentFilter === "UK"
                  ? { backgroundColor: "#d3d3d3", border: "1px solid gray" }
                  : {}
              }
              onClick={() => handleFilter("UK")}
            >
              UK
            </button>
            <button
              style={
                currentFilter === "Others"
                  ? { backgroundColor: "#d3d3d3", border: "1px solid gray" }
                  : {}
              }
              onClick={() => handleFilter("Others")}
            >
              Others
            </button>
          </div>
        </div>
        <div className="featureContainer">
          <h5>Add a Book:</h5>
          <button onClick={() => setModal((prev) => !prev)}>Add</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Country</th>
            <th className="languageCol">Language</th>
            <th>Year</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {renderedList.length > 0 ? (
            renderedList
              ?.slice(currentPage * 10 - 10, currentPage * 10)
              .map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.country}</td>
                  <td className="languageCol">{item.language}</td>
                  <td>{item.year}</td>
                  <td
                    className="editLabel"
                    onClick={() => handleEditBook(item)}
                  >
                    {"edit"}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "0 auto",
          width: "40%",
          alignItems: "center",
        }}
      >
        {renderedList.length > 0 &&
          [...Array(Math.ceil(renderedList.length / 10))].map((_, i) => (
            <span
              key={i}
              className={currentPage === i + 1 ? "activePage" : "pageNumber"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
      </div>
    </>
  );
}

export default BookList;
