`
<template>
  <section class="mt-4">
    <div
      class="block py-6 px-2 rounded-lg shadow-xl bg-blue-100 w-screen mb-7 container"
    >
      <form @submit.prevent="validar()" enctype="multipart/form-data">
        <h2 class="text-2xl">Registrar Alumno</h2>

        <div class="grid grid-cols-2 gap-2">
          <div class="form-group p-3">
            <input
              v-model.trim="ALUMNO.nombre"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="nombre"
              placeholder="Nombre"
            />
          </div>
          <div class="form-group p-3">
            <input
              v-model.trim="ALUMNO.apellido"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="apellidos"
              aria-describedby="apellido"
              placeholder="Apellidos"
            />
          </div>
        </div>
        <div class="flex justify-between rounded-md">
          <div class="form-group p-3">
            <input
              v-model.trim="ALUMNO.cedula"
              type="text"
              class="form-control block w-32 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="cedula"
              placeholder="Cedula"
            />
          </div>
          <div class="form-group p-3">
            <input
              v-model.trim="ALUMNO.instrumento"
              type="text"
              class="form-control px-3 py-1.5 w-32 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="cedula"
              placeholder="Instrumento"
            />
          </div>
        </div>
        <div class="form-group mb-6">
          <textarea
            rows="4"
            cols="50"
            v-model.trim="ALUMNO.direccion"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Direccion"
          ></textarea>
        </div>

        <div class="form-group mb-6 grid grid-cols-3 gap-2">
          <select
            v-model="ALUMNO.grupo"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option disabled value="">Grupo</option>
            <option>Solfeo</option>
            <option>Coro</option>
            <option>Orquesta</option>
          </select>
          <input
            type="text"
            v-model.trim="ALUMNO.telefono"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Telefono"
          />

          <input
            type="text"
            v-model.trim="ALUMNO.edad"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Edad"
          />

          <select
            v-model="ALUMNO.sexo"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option disabled value="">Sexo</option>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
          <input
            type="date"
            v-model.trim="ALUMNO.nacimiento"
            class="form-control col-span-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="F. Nacimiento"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group mb-6">
            <input
              type="text"
              v-model.trim="ALUMNO.madre"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Nombre de la Madre"
            />
            <input
              type="text"
              v-model.trim="ALUMNO.madreCedula"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cedula de la Madre"
            />

            <input
              type="text"
              v-model.trim="ALUMNO.direccionTrabajoMadre"
              class="form-control block my-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Direccion del trabajo de la Madre"
            />
          </div>

          <div class="form-group mb-6">
            <input
              type="text"
              v-model.trim="ALUMNO.padre"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="Padre"
              placeholder="Nombre de Padre"
            />
            <input
              type="text"
              v-model.trim="ALUMNO.padreCedula"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cedula del Padre"
            />

            <input
              v-model.trim="ALUMNO.direccionTrabajoPadre"
              type="text"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Direccion del trabajo de la Padre"
            />
          </div>
        </div>
        <span>Quien será el representante?</span>
        <div class="grid grid-cols-2 gap-3 my-6">
          <div class="form-check">
            <input
              v-model="ALUMNO.representante"
              class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="madre"
              value="madre"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="madre"
            >
              Madre
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="ALUMNO.representante"
              class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="padre"
              value="padre"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="padre"
            >
              Padre
            </label>
          </div>
        </div>
        <div class="form-control mb-6">
          <input class="bg-red-300" type="file" @change="archivo($event)" />
        </div>
        <button
          type="submit"
          class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          <span class="material-symbols-outlined"> save </span>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { updateAlumno, camposVacios, searchAlumno } from "../firebase";
import { archivo, url } from "../views/subirImagen";
import { useRouter } from "vue-router";
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
  setDoc,
  updateDoc,
} from "firebase/firestore";
const id = useRouter().currentRoute._rawValue.params.id;
const ALUMNO = ref({});

onMounted(async () => {
  await searchAlumno(id).then((alumno) => {
    ALUMNO.value = alumno;
  });
});

const validar = async () => {
  try {
    await archivo()
      .getDownloadURL()
      .then((url) => {
        ALUMNO.value.foto = url;
      });
    const registrar = await doc(db, "ALUMNOS", data.id);
    await updateDoc(registrar, ALUMNO); 
  } catch (error) {
    alert(error);
  }
};
</script>
