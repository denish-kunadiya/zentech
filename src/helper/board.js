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
} from "firebase/firestore";

export const createBoard = async (name, newColumns) => {
  const userId = store.getState()?.loginReducer?.user?.user?.uid;
  try {
    const db = getFirestore();
    const collectionRef = collection(db, "boards");
    const docRef = await addDoc(collectionRef, {
      name,
      isActive: true,
      columns: newColumns,
      userId, // Associate the board with the user
    });

    // You can redirect the user to a new page or perform additional actions here
  } catch (error) {
    // Handle board creation error
  }
};

// export const getBoards = async (name, newColumns) => {
//   const users = auth.currentUser;
//   const userId = users.uid;
//   console.log("userId", userId);
//   try {
//     const db = getFirestore();
//     const collectionRef = collection(db, "boards");
//     const docRef = await getDoc(collectionRef);

//     console.log("Board created successfully:", docRef);
//     // You can redirect the user to a new page or perform additional actions here
//   } catch (error) {
//     console.error("Board creation error:", error);
//     // Handle board creation error
//   }
// };

export const getBoards = () => {
  const db = getFirestore();
  const collectionRef = collection(db, "boards");

  const userId = store.getState()?.loginReducer?.user?.user?.uid;

  const q = query(collectionRef, where("userId", "==", userId));
  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("err", err);

        reject(err);
      });
  });
};

export const editBoards = async (name, columnUpdates, id) => {
  const db = getFirestore();
  const collectionRef = collection(db, "boards");

  const boardId = id; // Replace with your actual board ID
  const boardRef = doc(db, "boards", boardId);

  updateDoc(boardRef, {
    name,
    columns: columnUpdates,
  });
  console.log("Column names updated successfully.");
};

export const deleteBoard = async (id) => {
  // const userId = store.getState()?.loginReducer?.user?.user?.uid;

  // console.log("userId", userId);
  const boardId = id; // Replace with your actual board ID

  const db = getFirestore();
  const collectionRef = collection(db, "boards");

  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, "boards", boardId))
      .then((res) => {
        console.log("res deleteDoc", res);

        resolve(res);
      })
      .catch((err) => {
        console.log("err", err);

        reject(err);
      });
  });
};
