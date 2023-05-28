import { getBoards } from "../../helper/board";
import {
  BOARD_GET_SUCCESSFULL,
  SET_BOARD_ACTIVE,
  STOP_BOARD_PROCESSING,
  BOARD_PROCESSING,
} from "./type";

export const setBoardsAction = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: BOARD_PROCESSING });
    getBoards()
      .then((res) => {
        let data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch({
          type: BOARD_GET_SUCCESSFULL,
          payload: data,
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error);
        dispatch({ type: STOP_BOARD_PROCESSING });
      });
  });
};
export const setBoardActive = (payload) => {
  return {
    type: SET_BOARD_ACTIVE,
    payload,
  };
};
