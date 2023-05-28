import app, { auth } from "../firebase";
import { store } from "../redux/store";
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore";

export const addTask = (id, columnName, taskObject) => {
  console.log("columnName", columnName);
  // const userId = store.getState()?.loginReducer?.user?.user?.uid;
  console.log("id", id);
  const db = getFirestore();
  const boardId = id;
  const boardsRef = doc(db, "boards", boardId);

  return new Promise((resolve, reject) => {
    getDoc(boardsRef)
      .then((res) => {
        if (res.exists()) {
          const boardData = res.data();

          // Find the column by its name
          const column = boardData.columns.find(
            (col) => col.name === columnName
          );
          console.log("column :DDD:::", column);
          if (column) {
            // Add the new task object to the 'tasks' array of the column
            column.tasks.push(taskObject);

            // Update the board document with the modified column
            updateDoc(boardsRef, boardData)
              .then((res) => {
                resolve("Task added successfully!");
                console.log("Task added successfully!");
              })
              .catch((err) => {
                console.log("Column not found.");
              });
          }
        } else {
          console.log("Board document does not exist.");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTask = async (id, taskIndex, colIndex) => {
  const db = getFirestore();
  const boardId = id;

  // Get the reference to the 'boards' collection
  const boardsRef = doc(db, "boards", boardId);

  return new Promise((resolve, reject) => {
    getDoc(boardsRef)
      .then((res) => {
        if (res.exists() || res.data() !== undefined) {
          const boardData = res.data();
          // Find the column by its name
          const columnIndex = boardData.columns[colIndex];
          if (columnIndex !== -1) {
            // Find the task by its ID within the column
            const task = boardData?.columns[colIndex]?.tasks[taskIndex];

            if (task !== -1) {
              // Remove the task from the tasks array
              boardData.columns[columnIndex.columnIndex].tasks.splice(task, 1);

              // Update the board document with the modified column
              updateDoc(boardsRef, boardData).then((res) => {
                resolve("Task deleted successfully!");
              });

              // console.log("Task deleted successfully!");
            } else {
              console.log("Task not found.");
            }
          } else {
            console.log("Column not found.");
          }
        } else {
          console.log("Board document does not exist or access is denied.");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// export const editTask = async (id, taskIndex, colIndex, taskObject) => {
//   const db = getFirestore();
//   const boardId = id;

//   try {
//     const db = getFirestore();

//     // Get the reference to the 'boards' collection
//     const boardsRef = doc(db, "boards", boardId);
//     // Get the board document
//     const boardSnapshot = await getDoc(boardsRef);
//     console.log("boardSnapshot.exists()", boardSnapshot.exists());

//     if (boardSnapshot.exists() || boardSnapshot.data() !== undefined) {
//       const boardData = boardSnapshot.data();

//       // Find the column by its name
//       const columnIndex = boardData.columns[colIndex].columnIndex;
//       console.log("columnIndex :::LLLL", columnIndex);

//       if (columnIndex !== -1) {
//         // Find the task by its ID within the column
//         const task = boardData.columns[columnIndex].tasks[taskIndex];

//         if (task !== -1) {
//           // Update the task properties with the updatedTask object
//           boardData.columns[columnIndex].tasks[taskIndex] = {
//             ...boardData.columns[columnIndex].tasks[taskIndex],
//             ...taskObject,
//           };

//           // Update the board document with the modified column
//           await updateDoc(boardsRef, boardData);

//           console.log("Task updated successfully!");
//         } else {
//           console.log("Task not found.");
//         }
//       } else {
//         console.log("Column not found.");
//       }
//     } else {
//       console.log("Board document does not exist or access is denied.");
//     }
//   } catch (error) {
//     console.error("Error editing task: ", error);
//   }
// };

export const editTask = async (id, taskIndex, colIndex, taskObject) => {
  const db = getFirestore();
  const boardId = id;

  // Get the reference to the 'boards' collection

  return new Promise((resolve, reject) => {
    const boardsRef = doc(db, "boards", boardId);
    // Get the board document
    getDoc(boardsRef)
      .then((res) => {
        if (res.exists() || res.data() !== undefined) {
          const boardData = res.data();

          // Find the column by its name
          const columnIndex = boardData.columns.findIndex(
            (column) => column.name === taskObject.status
          );
          console.log("columnIndex :::LLLL", columnIndex);

          if (columnIndex !== -1) {
            // Find the task by its ID within the column
            const task = boardData.columns[colIndex].tasks[taskIndex];

            if (task !== -1) {
              // Update the task properties with the updatedTask object
              boardData.columns[colIndex].tasks[taskIndex] = {
                ...boardData.columns[colIndex].tasks[taskIndex],
                ...taskObject,
              };

              // Check if the status has changed
              if (taskObject.status !== boardData.columns[colIndex].name) {
                // Remove the task from its current status column
                boardData.columns[colIndex].tasks.splice(taskIndex, 1);

                // Add the task to the new status column
                boardData.columns[columnIndex].tasks.push(task);
              }

              // Update the board document with the modified column
              updateDoc(boardsRef, boardData)
                .then((res) => {
                  resolve("Task updated successfully!");
                })
                .catch((err) => {
                  reject("Task not found.");
                });
            }
          } else {
            console.log("Column not found.");
          }
        } else {
          console.log("Board document does not exist or access is denied.");
        }
      })

      .catch((err) => {
        reject(err);
      });
  });
};

export const editSubTask = async (id, subtaskId, isCompleted) => {
  console.log("isCompleted", isCompleted);
  const db = getFirestore();
  const boardId = id;
  const boardsRef = doc(db, "boards", boardId);

  return new Promise((resolve, reject) => {
    getDoc(boardsRef)
      .then((res) => {
        if (res.exists() || res.data() !== undefined) {
          const boardData = res.data();

          // Iterate over the columns and tasks to find the subtask
          let found = false;
          for (
            let colIndex = 0;
            colIndex < boardData.columns.length;
            colIndex++
          ) {
            const tasks = boardData.columns[colIndex].tasks;
            for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
              const subtasks = tasks[taskIndex].subtasks;
              const subtaskIndex = subtasks.findIndex(
                (subtask) => subtask.id === subtaskId
              );
              if (subtaskIndex !== -1) {
                // Update the 'isCompleted' field of the subtask
                tasks[taskIndex].subtasks[subtaskIndex].isCompleted =
                  isCompleted;
                found = true;
                break;
              }
            }
            if (found) {
              break;
            }
          }

          if (found) {
            // Update the board document with the modified data
            updateDoc(boardsRef, boardData)
              .then((res) => {
                resolve("Subtask updated successfully!");
              })
              .catch((err) => reject("Subtask not found."));
            // console.log("Subtask updated successfully!");
          } else {
            console.log("Subtask not found.");
          }
        } else {
          console.log("Board document does not exist or access is denied.");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
