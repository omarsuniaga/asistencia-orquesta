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
import { db, searchAlumno, getAsignaturas } from "../firebase";
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
const GRUPO = ref([]);
var EDITABLE = ref(null);
const selected = ref("TODOS");

/*
 PROCESO NUMERO 1 => [IniciarPorGrupo]:


 * PERMITE BUSCAR A LOS ALUMNOS SEGUN EL GRUPO SELECCIONADO
 * ENVIA A LOS ALUMNOS ENCONTRADOS A [FETCH ALUMNOS]
 */
const IniciarPorGrupo = async () => {
  let listadoRef = collection(db, "ALUMNOS");
  let q = query(listadoRef, where("grupo", "==", selected.value));
  let querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    limpiarColumna();
  } else {
    limpiarColumna();
    querySnapshot.forEach((doc) => {
      return fetchAlumnos(doc.data());
      // return await llenarListado(querySnapshot.docs[0].data());
    });
  }
};

const IniciarPorFecha = async () => {
  let listadoRef = collection(db, "ASISTENCIA");
  let q = query(listadoRef, where("FECHA", "==", FECHA.value));
  let querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    limpiarColumna();
    MostrarTodos();
  } else {
    limpiarColumna();
    querySnapshot.forEach((doc) => {
      EDITABLE.value = false;
      PRESENTES.value = doc
        .data()
        .listaPresentes.filter((e) => e.estado === true);
      LISTADOS.value = doc
        .data()
        .listaAusentes.filter((e) => e.estado === false);
    });
  }
};

const MostrarTodos = async () => {
  let listadoRef = collection(db, "ALUMNOS");
  let querySnapshot = await getDocs(listadoRef);
  querySnapshot.forEach((doc) => {
    // selected.value = "TODOS";
    return fetchAlumnos(doc.data());
    // return await llenarListado(querySnapshot.docs[0].data());
  });
};

const FiltrarGrupoFecha = async () => {
  let listadoRef = collection(db, "ASISTENCIA");
  let q = query(
    listadoRef,
    where("FECHA", "==", FECHA.value)
    // where("GRUPO", "==", selected.value)
  );
  let querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    limpiarColumna();
    EDITABLE.value = true;
    console.log("VACIO");
  } else {
    limpiarColumna();
    querySnapshot.forEach((doc) => {
      EDITABLE.value = true;
      selected.value = doc.data().GRUPO;
      PRESENTES.value = doc
        .data()
        .listaPresentes.filter((e) => e.estado === true);
      LISTADOS.value = doc
        .data()
        .listaAusentes.filter((e) => e.estado === false);
    });
  }
};

watchEffect(() =>
  FECHA.value === FECHAHOY ? IniciarPorFecha() : FiltrarGrupoFecha()
);
watchEffect(() =>
  selected.value === "TODOS" ? MostrarTodos() : IniciarPorGrupo()
);

provide("ALUMNOS", ALUMNOS);
provide("LISTADOS", LISTADOS);
provide("PRESENTES", PRESENTES);
provide("AUSENTES", AUSENTES);
provide("FECHAHOY", FECHAHOY);
provide("GRUPO", GRUPO);

onMounted(async () => {
  const asig = await getAsignaturas();
  asig.docs.forEach((doc) => GRUPO.value.push(doc.id));
  FECHA.value === FECHAHOY ? IniciarPorFecha() : FiltrarGrupoFecha();
});

//GUARDAR PRESENTES
const guardarPresentes = async (data) => {
  const registrar = await doc(db, "ASISTENCIA", FECHA.value); // "2022-03-03"
  return await updateDoc(registrar, {
    FECHA: FECHA.value, //FECHA.value
    listaPresentes: arrayUnion({
      nombreCompleto: data.nombreCompleto,
      estado: true,
      id: data.id,
    }),
  });
};

//GUARDAR AUSENTES
const guardarAusentes = async (data) => {
  const asistencia = await doc(db, "ASISTENCIA", FECHA.value); // "2022-03-03"
  await updateDoc(asistencia, {
    FECHA: FECHA.value, //FECHA.value
    listaAusentes: arrayUnion({
      nombreCompleto: data.nombreCompleto,
      estado: false,
      id: data.id,
    }),
  });
};

const limpiarColumna = () => {
  PRESENTES.value = []; //Limpiar la columna de presentes
  LISTADOS.value = []; //Limpiar la columna de listados
  return;
};

//GUARDAR EN FIREBASE
const guardar = async () => {
  if (GRUPO.value !== "") {
    await setDoc(doc(db, "ASISTENCIA", FECHA.value), {
      FECHA: FECHA.value,
      GRUPO: selected.value,
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
    alert("Debes seleccionar una GRUPO");
  }
};

/*
[FETCHALUMNOS] PROCESO NUMERO 2:

1. RECIBE A LOS ALUMNOS ENCONTRADOS DESDE [INIT]
2. CREA UNA TARJETA DE CADA ALUMNO
3. SE ENVIA LA TARJETA A [LISTAR] PARA SER APILADOS
*/
const fetchAlumnos = async (data) => {
  let alumno = {
    id: data.id,
    foto: data.foto,
    nombreCompleto: data.nombre + " " + data.apellido,
    grupo: data.grupo,
    estado: false,
  };
  llenarListado(alumno);
  // listar(alumno);
};

/*
//[LISTAR] PROCESO NUMERO 3:

1. RECIBE LOS ALUMNOS DESDE FILTRADOS DESDE [FETCH ALUMNOS]
2. CREA UNA COLUMNA DE ALUMNOS CON ESTADO FALSE
3. AL SER CLICKEADO SE PASAN A LA COLUMNAS DE ALUMNOS PRESENTES O AUSENTES
*/
const listar = (alumno) => {
  return LISTADOS.value.push(alumno);
};

//LLenar listado de presentes y ausentes
const llenarListado = async (r) => {
  searchAlumno(r.id).then((alumno) => { 
    LISTADOS.value.push({foto:alumno.foto,...r});
  });
}

    
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
          v-model="selected"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-1 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="TODOS">TODOS</option>
          <option v-for="option in GRUPO" :key="option.id" :value="option">
            {{ option }}
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
          :hidden="EDITABLE"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-1 rounded-full shadow-xl"
          @click="guardar()"
        >
          Guardar
        </button>
      </div>

      <div
        class="flex gap-1 mt-1 sm:-mx-6 lg:-mx-8 absolute top-16 bottom-28 overflow-y-auto"
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
  </div>
</template>
