import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { setBooks } from "./redux/actions/bookAction";
import BookList from "./components/BookList";

function App() {
  const dispatch = useDispatch();
  const getAllBooks = () => {
    axios
      .get("http://68.178.162.203:8080/application-test-v1.1/books")
      .then((res) => {
        const data = res?.data?.data;
        if (data) {
          dispatch(setBooks(data));
        }
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    getAllBooks();
  }, []);
  return (
    <>
      <div className="appContainer">
        <Header />
        <SearchBar />
        <BookList />
      </div>
    </>
  );
}

export default App;
