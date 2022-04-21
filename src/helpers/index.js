/**
 * @param {string} email
 */
export function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//create today's date
export const getTodayDate = () => {
  let date = new Date();
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let year =
    date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
  return `${day}-${month}-${year}`;
};
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getFirestore,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
// import { getDatabase, ref, onValue, set } from "firebase/database";

//search in firebase database
export const search = async (id) => {
  const q = query(collection(db, "alumnos"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    doc.data().estado = true;
    console.log(doc.id, " => ", doc.data());
  });
};

//upodate in firebase database
export const actualizar = (id, data) => {
  console.log(id, data);
  // updateDoc(doc(db, "alumnos", id), data);
};

//Crear Lista de Alumnos
export const listar = async () => {
  const items = [];
  const querySnapshot = await getDocs(collection(db, "alumnos"));
  try {
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
  return items;
};
