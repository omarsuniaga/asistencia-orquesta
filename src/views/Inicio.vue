<script setup>
/*
1. Mostrar Listado de alumnos Registrados
2. Mostrar Listado de alumnos Asistidos
3. Mostrar Listado de alumnos que no asistieron
4. Validar que no se repita el alumno de la tabla de asistencia

- almacenar el listado de alumnos de firebase en un arreglo
- recorrer el arreglo con la directiva v-for
- al dar click en cada item de la TABLA DE ALUMNOS:
    - se agrega el ITEM  a la TABLA DE ASISTENCIA
    - se quita de la TABLA DE ALUMNOS
- al dar click en cada item de la TABLA DE ALUMNOS
    - se agrega el ITEM  a la TABLA DE ASISTENCIA
    - se quita el ITEMS de la TABLA DE ALUMNOS

- ITEMS:
  Cada items tiene un estado:
    -Si el estado es "false":
        Significa que estara por default en la TABLA DE ALUMNOS
    -Si el estado es "true"
        Significa que estara en la TABLA DE ASISTENCIA

TABLAS/VARIABLES - GLOBALES:
  - ALUMNOS (Objeto) -> ID, Nombre, Apellido, Foto, Grupo, Edad, Sexo, Madre, Padre, Tlf, Direccion, Nacimiento, Registrada
  - LISTADOS (Objeto) -> NombreCompleto, ID, Estado
  - PRESENTES (Array) -> ID
  - AUSENTES (Array) -> ID


*/

import { provide, onMounted, ref, watchEffect } from "vue";
import { db, searchAlumno } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import Listado from "../components/Listado.vue";
import Estado from "../components/Estado.vue";

// CREAR VARIABLES GLOBALES;
const ALUMNOS = ref({});
const LISTADOS = ref([]);
const PRESENTES = ref([]);
const AUSENTES = ref([]);
const FECHAHOY = moment().format("YYYY-MM-DD");
const FECHA = ref(FECHAHOY);
const CLASE = ref([
  { text: "Teoria y Solfeo", value: "Teoria-Solfeo" },
  { text: "Orquesta", value: "Orquesta" },
  { text: "Coro", value: "Coro" },
]);

watchEffect(() => (FECHA.value !== FECHAHOY ? init() : null));

provide("ALUMNOS", ALUMNOS);
provide("LISTADOS", LISTADOS);
provide("PRESENTES", PRESENTES);
provide("AUSENTES", AUSENTES);
provide("FECHAHOY", FECHAHOY);
provide("CLASE", CLASE);

onMounted(async () => {
  init(); //BUSCAR POR FECHA
});

// CREA LA TARJETA DE LOS ALUMNOS
const fetchAlumnos = async () => {
  const alumnoRef = collection(db, "ALUMNOS");
  const querySnapshot = await getDocs(alumnoRef);
  querySnapshot.forEach((doc) => {
    let alumno = {};
    let r = doc.data(); //r = ruta
    alumno.id = r.id;
    alumno.foto = r.foto;
    alumno.nombreCompleto = r.nombre + " " + r.apellido;
    alumno.grupo = r.grupo;
    alumno.estado = false;
    //Enviar el objeto a la lista de alumnos
    listar(alumno);
  });
};

// AGREGA LISTA DE TARJETAS
const listar = (alumno) => {
  return LISTADOS.value.push(alumno);
};

//GUARDAR PRESENTES
const guardarPresentes = async (data) => {
  // let presentes = [];
  // PRESENTES.value.map((alumno) => presentes.push(alumno.id));
  // return presentes;
  const registrar = await doc(db, "ASISTENCIA", FECHA.value); // "2022-03-03"
  return await updateDoc(registrar, {
    FECHA: FECHA.value, //FECHA.value
    listado: arrayUnion({
      nombreCompleto: data.nombreCompleto,
      estado: true,
      id: data.id,
    }),
  });
  // return resultado;
};

//GUARDAR AUSENTES
const guardarAusentes = async (data) => {
  // let ausentes = [];
  // AUSENTES.value = LISTADOS.value.map((alumno) => ausentes.push(alumno.id));
  // return ausentes;
  const registrar = await doc(db, "ASISTENCIA", FECHA.value); // "2022-03-03"
  return await updateDoc(registrar, {
    FECHA: FECHA.value, //FECHA.value
    listado: arrayUnion({
      nombreCompleto: data.nombreCompleto,
      estado: false,
      id: data.id,
    }),
  });
  // return resultado;
};

//GUARDAR EN FIREBASE
const guardar = async () => {
  if (CLASE.value !== "") {
    // let listado = {};
    // listado.presentes = guardarPresentes();
    // listado.ausentes = guardarAusentes();
    // await setDoc(doc(db, "ASISTENCIA", FECHA.value), listado);
    await setDoc(doc(db, "ASISTENCIA", FECHA.value), {
      FECHA: FECHA.value,
      CLASE: CLASE.value,
    });
    try {
      PRESENTES.value.map(async (data) => {
        return await guardarPresentes(data);
      });
      LISTADOS.value.map(async (data) => {
        return await guardarAusentes(data);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return alert("Listado Actualizado");
  } else {
    alert("Debes seleccionar una Clase");
  }
};

//INICIAR POR FECHA
const init = async () => {
  let listadoRef = collection(db, "ASISTENCIA");
  let q = query(listadoRef, where("FECHA", "==", FECHA.value)); //"2022-03-03"
  let querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    PRESENTES.value = [];
    LISTADOS.value = [];
    fetchAlumnos();
    return;
  } else {
    // fetchAlumnos();
    return await llenarListado(querySnapshot.docs[0].data());
  }
};

//LLenar listado de presentes y ausentes
const llenarListado = async (r) => {
  PRESENTES.value = [];
  LISTADOS.value = [];
  console.log(r);
  r.listado.map((el) => {
    if (el.estado) {
      searchAlumno(el.id).then((alumno) => {
        PRESENTES.value.push({
          ...el,
          foto: alumno.foto,
        });
      });
    } else {
      searchAlumno(el.id).then((alumno) => {
        LISTADOS.value.push({
          ...el,
          foto: alumno.foto,
        });
      });
    }
  });
  // });
  // r.ausentes.map((id) => {
  //   algo(id);
  //   searchAlumno(id).then(() => {
  //     // LISTADOS.value.push({
  //     //   ...alumno,
  //     //   nombreCompleto: alumno.nombre + " " + alumno.apellido,
  //     // });
  //   });
  // });
};

const algo = (id) => {
  fetchAlumnos().then(() => {
    LISTADOS.value.map((alumno) => {
      if (alumno.id !== id) {
        // LISTADOS.value.splice(LISTADOS.value.indexOf(alumno), 1);
        LISTADOS.value.push({
          ...alumno,
          nombreCompleto: alumno.nombre + " " + alumno.apellido,
        });
      }
    });
  });
};
</script>
<template>
  <div class="fixed top-14 mt-2 h-full w-full">
    <!-- two columns flex -->
    <div class="flex gap-0 items-center justify-between py-2 bg-slate-300">
      <div
        class="w-1/3 px-1 text-left text-xs font-medium text-gray-500 uppercase"
      >
        <!-- ADD SELECT LIST -->
        <select
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-1 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option v-for="option in CLASE" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div>
        <input
          type="date"
          name="SearchDate"
          v-model="FECHA"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-1 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div
        class="px-2 w-1/3 text-left text-xs font-medium text-gray-500 uppercase"
      >
        <!-- Button save -->

        <button
          type="button"
          :hidden="FECHA !== FECHAHOY"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2  px-1 rounded-full shadow-xl"
          @click="guardar()"
        >
          Guardar
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-1 mt-1 sm:-mx-6 lg:-mx-8 absolute top-16 bottom-16 overflow-y-auto"
    >
      <div>
        <!-- TABLA DE ALUMNOS -->
        <Listado />
      </div>
      <div>
        <!-- TABLA DE ASISTENCIA -->
        <Estado />
      </div>
    </div>
  </div>
</template>
