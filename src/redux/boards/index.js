import { BOARD_GET_SUCCESSFULL, SET_BOARD_ACTIVE } from "./type";

const defaultReducer = {
  processing: false,
  boards: null,
  index: 0,
};

const boardReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    case BOARD_GET_SUCCESSFULL:
      return {
        ...state,
        processing: false,
        boards: action.payload,
      };

    case SET_BOARD_ACTIVE:
      return {
        ...state,
        index: action.payload,
      };

    // case STOP_LOGIN_PROCESSING:
    //   return {
    //     ...state,
    //     processing: false,
    //     isLoggedIn: false,
    //   };

    // case LOGOUT_SUCCESSFUL: {
    //   return {
    //     ...state,
    //     ...defaultReducer,
    //   };
    // }

    default:
      return state;
  }
};

export default boardReducer;
