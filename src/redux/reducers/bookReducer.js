import {
  ADD_BOOK,
  SET_BOOKS,
  SET_RESLUT_LIST,
  SET_SEARCH_QUERY,
  SET_SELECTED_BOOK,
  EDIT_BOOK_DETAIL,
} from "../actionTypes/actionTypes";

const initialState = {
  //   numOfItems: 0,
  bookList: [],
  resultList: [],
  searchQueryEntered: false,
  selectedBook: {
    author: "",
    title: "",
    id: "",
    year: "",
    country: "",
    language: "",
    type: "",
  },
};

const bookReducer = (state = initialState, action) => {
  console.log("action payload", action);
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        // bookList: [...state.bookList, ...action.payload],
        bookList: [...action.payload],
      };
    case ADD_BOOK:
      return {
        ...state,
        bookList: [action.payload, ...state.bookList],
      };
    case SET_RESLUT_LIST:
      return {
        ...state,
        resultList: [...action.payload],
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQueryEntered: action.payload,
      };
    case SET_SELECTED_BOOK:
      return {
        ...state,
        selectedBook: { ...action.payload },
      };
    case EDIT_BOOK_DETAIL:
      const updatedList = state.bookList.map((item) => {
        if (item?.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
      const updatedResultList = state.resultList.map((item) => {
        if (item?.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
      return {
        ...state,
        bookList: [...updatedList],
        resultList: [...updatedResultList],
      };

    // case DELETE_ITEM:
    //   return {
    //     ...state,
    //     numOfItems: state.numOfItems - 1,
    //   };
    default:
      return state;
  }
};
export default bookReducer;
