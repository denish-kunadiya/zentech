import app, { auth } from "../firebase";
import { store } from "../redux/store";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  writeBatch,
  deleteDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

export const addTask = async (id, boardName, columnName, taskObject) => {
  // const userId = store.getState()?.loginReducer?.user?.user?.uid;
  console.log("id", id);
  try {
    const db = getFirestore();
    const boardId = id;
    // Get the reference to the 'boards' collection
    // const boardsRef = collection(db, "boards");
    const boardsRef = doc(db, "boards", boardId);
    // Query the collection to find the desired board by name
    const boardSnapshot = await getDoc(boardsRef);
    console.log("boardSnapshot.exists()", boardSnapshot.exists());
    console.log("boardSnapshot.data()", boardSnapshot.data());
    if (boardSnapshot.exists()) {
      const boardData = boardSnapshot.data();

      // Find the column by its name
      const column = boardData.columns.find((col) => col.name === columnName);

      if (column) {
        // Add the new task object to the 'tasks' array of the column
        column.tasks.push(taskObject);

        // Update the board document with the modified column
        await updateDoc(boardsRef, boardData);

        console.log("Task added successfully!");
      } else {
        console.log("Column not found.");
      }
    } else {
      console.log("Board document does not exist.");
    }
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};
