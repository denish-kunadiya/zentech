import { BOARD_GET_SUCCESSFULL, SET_BOARD_ACTIVE } from "./type";

export const setBoardsAction = (payload) => {
  // console.log("payload ser", payload);
  return {
    type: BOARD_GET_SUCCESSFULL,
    payload,
  };
};
export const setBoardActive = (payload) => {
  // console.log("payload ser", payload);
  return {
    type: SET_BOARD_ACTIVE,
    payload,
  };
};

// setBoardActive: (state, action) => {
//   state.map((board, index) => {
//     index === action.payload.index
//       ? (board.isActive = true)
//       : (board.isActive = false);
//     return board;
//   });
// },
