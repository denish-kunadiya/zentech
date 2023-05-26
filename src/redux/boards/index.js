import {
  BOARD_GET_SUCCESSFULL,
  SET_BOARD_ACTIVE,
  STOP_BOARD_PROCESSING,
  BOARD_PROCESSING,
} from "./type";

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
        processing: false,
        index: action.payload,
      };

    case BOARD_PROCESSING:
      return {
        ...state,
        processing: true,
      };

    case STOP_BOARD_PROCESSING: {
      return {
        ...state,
        processing: false,
      };
    }

    default:
      return state;
  }
};

export default boardReducer;
