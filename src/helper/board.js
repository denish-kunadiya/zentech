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
  console.log("name", name);
  console.log("newColumns", newColumns);
  const userId = store.getState()?.loginReducer?.user?.user?.uid;
  //   const users = auth.currentUser;
  //   const userId = users.uid;
  console.log("userId", userId);
  try {
    const db = getFirestore();
    const collectionRef = collection(db, "boards");
    const docRef = await addDoc(collectionRef, {
      name,
      isActive: true,
      columns: newColumns,
      userId, // Associate the board with the user
    });

    console.log("Board created successfully:", docRef.id);
    // You can redirect the user to a new page or perform additional actions here
  } catch (error) {
    console.error("Board creation error:", error);
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

  console.log("userId", userId);

  const q = query(collectionRef, where("userId", "==", userId));
  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((res) => {
        console.log("res", res);

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

  // const userId = store.getState()?.loginReducer?.user?.user?.uid;
  console.log("columnUpdates", columnUpdates);
  const boardId = id; // Replace with your actual board ID
  const boardRef = doc(db, "boards", boardId);

  // const updates = {};
  // const boardSnapshot = await getDoc(boardRef);
  // console.log("boardSnapshot", boardSnapshot);
  // const currentColumns = boardSnapshot.data().columns;

  // const updatedColumns = currentColumns.map((column, index) => {
  //   const update = columnUpdates.find((update) => update.columnIndex === index);
  //   if (update) {
  //     return { ...column, name: update.name };
  //   }
  //   return column;
  // });
  // console.log("updatedColumns", updatedColumns);

  updateDoc(boardRef, {
    name,
    columns: columnUpdates,
  });

  // boardRef.update({ name, columns: columnUpdates });

  console.log("Column names updated successfully.");

  // columnUpdates.forEach((update) => {
  //   const { columnIndex, name } = update;
  //   console.log("update", update);
  //   // console.log("newColumnName", newColumnName);
  //   console.log("name", name);
  //   updates[`columns.${columnIndex}.name`] = name;
  // });

  // return new Promise((resolve, reject) => {
  //   updateDoc(boardRef, {
  //     name,
  //   })
  //     .then((res) => {
  //       console.log("res", res);

  //       resolve(res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);

  //       reject(err);
  //     });
  // });
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
