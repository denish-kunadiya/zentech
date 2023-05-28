import { combineReducers } from "redux";
import loginReducer from "./auth";
import boardReducer from "./boards";

const rootReducer = combineReducers({
  loginReducer,
  boardReducer,
});

export default rootReducer;
