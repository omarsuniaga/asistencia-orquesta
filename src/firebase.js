import { initializeApp } from "firebase/app";
import { computed, onMounted, onUnmounted, ref } from "vue";
// import { getDatabase, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  where,
  query,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
});
export const storage = getStorage(firebaseApp);

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);
  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);
  return { user, error, isAuthenticated };
};

export const useSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (e) {
    alert(e.message);
  }
};

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const db = getFirestore(firebaseApp);

export const writeUserData = (id, valor) => {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    codigo: id,
    estado: valor,
  });
};
// /**
//  * Save a New Alumno in Firestore
//  * @param {string} title the title of the Alumno
//  * @param {string} description the description of the Alumno
//  */
export const saveAlumno = async (newAlumno) => {
  try {
    await addDoc(collection(db, "ALUMNOS"), newAlumno).then(() => {
      alert("Alumno Guardado");
    });
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
};

export const evitarDuplicados = async (newAlumno) => {
  let alumnosRef = collection(db, "ALUMNOS");
  let q = query(
    alumnosRef,
    where("nombre", "==", newAlumno.nombre),
    where("apellido", "==", newAlumno.apellido)
  );
  return await getDocs(q).then(
    (docs) => docs.empty
  ); /* si esta vacio es porque no hay duplicados */
};

export const camposVacios = (newAlumno) => {
  if (
    newAlumno.nombre !== "" ||
    newAlumno.apellido !== "" ||
    newAlumno.cedula !== "" ||
    newAlumno.direccion !== "" ||
    newAlumno.telefono !== "" ||
    newAlumno.sexo !== "" ||
    newAlumno.grupo !== "" ||
    newAlumno.edad !== "" ||
    newAlumno.nacimiento !== "" ||
    newAlumno.madre !== "" ||
    newAlumno.madreCedula !== "" ||
    newAlumno.padre !== "" ||
    newAlumno.padreCedula !== "" ||
    newAlumno.direccionTrabajoPadre !== "" ||
    newAlumno.direccionTrabajoMadre !== "" ||
    newAlumno.representante !== ""
  ) {
    return true;
  } else {
    return false;
  }
};

export { onSnapshot, collection };

export const deleteAlumno = async (id) => {
  try {
    return await deleteDoc(doc(db, "ALUMNOS", id));
  } catch (error) {
    console.log(error);
  }
};

export const getAlumnos = async () => {
  try {
    let alumnosRef = collection(db, "ALUMNOS");
    return await getDocs(alumnosRef);
  } catch (error) {
    console.log(error);
  }
};

export const getAsignaturas = async () => {
  try {
    let asignaturasRef = collection(db, "ASIGNATURAS");
    return await getDocs(asignaturasRef);
  } catch (error) {
    console.log(error);
  }
};

export const searchAlumno = async (id) => {
  try {
    let alumnosRef = collection(db, "ALUMNOS");
    let q = query(alumnosRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
  }
  //  return null
};
