import React, { useRef, useState } from "react";
import "./BookForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  editBookDetails,
  setSelecedBook,
} from "../redux/actions/bookAction";
import axios from "axios";

function BookForm({ setModal }) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) => state.selectedBook);

  const initialBookDetails = {
    author: "",
    title: "",
    id: "",
    year: "",
    country: "",
    language: "",
  };
  const [formData, setFormData] = useState(
    selectedBook.type === "edit" ? selectedBook : initialBookDetails
  );
  const addBookToDB = async () => {
    const response = await axios.post(
      "http://68.178.162.203:8080/application-test-v1.1/books",
      formData
    );
    return response?.data?.status;
  };
  const editBookDetail = async () => {
    const response = await axios.put(
      `http://68.178.162.203:8080/application-test-v1.1/books/${formData?.id}`,
      formData
    );
    console.log("response", response);
    return response?.status;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const status =
      selectedBook.type === "edit"
        ? await editBookDetail()
        : await addBookToDB();
    console.log("status value", status);
    if (status === 200) {
      selectedBook.type === "edit"
        ? dispatch(editBookDetails(formData))
        : dispatch(addBook(formData));
    } else {
      alert("Something went wrong!!! Please try again.");
    }
    dispatch(setSelecedBook({ ...initialBookDetails }));

    setFormData({
      author: "",
      title: "",
      id: "",
      year: "",
      country: "",
      language: "",
    });
    setModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="modal">
      <h5>Enter book details:</h5>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="formContainer">
          <span className="inputContainer">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author's name"
            />
          </span>
          <span className="inputContainer">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
            />
          </span>
          <span className="inputContainer">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </span>
          <span className="inputContainer">
            <label>Id:</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="id"
            />
          </span>
          <span className="inputContainer">
            <label>Language:</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="Language"
            />
          </span>
          <span className="inputContainer">
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="year"
            />
          </span>
        </div>
        <div className="btnContainer">
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              setModal(false);
              dispatch(setSelecedBook({ ...initialBookDetails }));
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
