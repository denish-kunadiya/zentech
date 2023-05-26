import { LOGIN_SUCCESSFULL, STOP_LOGIN_PROCESSING, LOGOUT_SUCCESSFUL, LOGIN_PROCESSING } from "./type";

const defaultReducer = {
  isLoggedIn: false,
  processing: false,
  user: null,
};

const loginReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFULL:
      return {
        ...state,
        processing: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGIN_PROCESSING:
      return {
        ...state,
        processing: true,
        isLoggedIn: false,
      };

    case STOP_LOGIN_PROCESSING:
      return {
        ...state,
        processing: false,
        isLoggedIn: false,
      };

    case LOGOUT_SUCCESSFUL: {
      return {
        ...state,
        ...defaultReducer,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
