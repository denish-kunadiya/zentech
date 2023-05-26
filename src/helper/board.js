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

  // const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });

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
