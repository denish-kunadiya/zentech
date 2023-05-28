import { combineReducers } from "redux";
import loginReducer from "./auth";
import boardReducer from "./boards";
import boardsSlice from "./boardsSlice";

// let boards = boardsSlice.reducer;

const rootReducer = combineReducers({
  loginReducer,
  boardReducer,
  // boards,
});

export default rootReducer;
