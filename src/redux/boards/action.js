import { getBoards } from "../../helper/board";
import {
  BOARD_GET_SUCCESSFULL,
  SET_BOARD_ACTIVE,
  STOP_BOARD_PROCESSING,
  BOARD_PROCESSING,
} from "./type";

export const setBoardsAction = (payload) => (dispatch) => {
  // console.log("payload ser", payload);
  // return {
  //   type: BOARD_GET_SUCCESSFULL,
  //   payload,
  // };

  return new Promise((resolve, reject) => {
    // console.log("payload", payload);
    dispatch({ type: BOARD_PROCESSING });
    getBoards()
      .then((res) => {
        console.log("res kkkk", res);
        let data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch({
          type: BOARD_GET_SUCCESSFULL,
          payload: data,
        });
        resolve(data);
      })
      .catch((error) => {
        console.log("error", error);
        reject(error);
        dispatch({ type: STOP_BOARD_PROCESSING });
      });
  });
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
