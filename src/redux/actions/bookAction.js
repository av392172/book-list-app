import {
  ADD_BOOK,
  EDIT_BOOK_DETAIL,
  SET_BOOKS,
  SET_RESLUT_LIST,
  SET_SEARCH_QUERY,
  SET_SELECTED_BOOK,
} from "../actionTypes/actionTypes";

const addBook = (payload) => {
  return {
    type: ADD_BOOK,
    payload,
  };
};

const setBooks = (payload) => {
  return {
    type: SET_BOOKS,
    payload,
  };
};

const setResultList = (payload) => {
  return {
    type: SET_RESLUT_LIST,
    payload,
  };
};

const setSearchQuery = (payload) => {
  return {
    type: SET_SEARCH_QUERY,
    payload,
  };
};
const setSelecedBook = (payload) => {
  return {
    type: SET_SELECTED_BOOK,
    payload,
  };
};
const editBookDetails = (payload) => {
  return {
    type: EDIT_BOOK_DETAIL,
    payload,
  };
};

export {
  addBook,
  setBooks,
  setResultList,
  setSearchQuery,
  setSelecedBook,
  editBookDetails,
};
