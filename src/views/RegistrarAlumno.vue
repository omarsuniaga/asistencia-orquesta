`
<template>
  <section class="mt-4">
    <div class="block py-6 px-2 rounded-lg shadow-xl bg-blue-100 w-full mb-7">
      <form @submit.prevent="validar()" enctype="multipart/form-data">
        <h2 class="text-2xl">Registrar Alumno</h2>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group p-3">
            <input
              v-model.trim="newAlumno.nombre"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="nombre"
              placeholder="Nombre"
            />
          </div>
          <div class="form-group p-3">
            <input
              v-model.trim="newAlumno.apellido"
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
              v-model.trim="newAlumno.cedula"
              type="text"
              class="form-control block w-64 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="cedula"
              placeholder="Cedula del Alumno"
            />
          </div>
          <div class="form-group p-3">
            <input
              v-model.trim="newAlumno.instrumento"
              type="text"
              class="form-control block w-64 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="cedula"
              placeholder="Instrumentos Preferido"
            />
          </div>
        </div>
        <div class="form-group mb-6">
          <textarea
            rows="4"
            cols="50"
            v-model.trim="newAlumno.direccion"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Direccion"
          ></textarea>
        </div>

        <div class="form-group mb-6 grid grid-cols-3 gap-2">
          <select
            v-model="newAlumno.grupo"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option disabled value="">Grupo</option>
            <option>Solfeo</option>
            <option>Coro</option>
            <option>Orquesta</option>
          </select>
          <input
            type="text"
            v-model.trim="newAlumno.telefono"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Telefono"
          />

          <input
            type="text"
            v-model.trim="newAlumno.edad"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Edad"
          />

          <select
            v-model="newAlumno.sexo"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option disabled value="">Sexo</option>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
          <input
            type="date"
            v-model.trim="newAlumno.nacimiento"
            class="form-control col-span-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="F. Nacimiento"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group mb-6">
            <input
              type="text"
              v-model.trim="newAlumno.madre"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Nombre de la Madre"
            />
            <input
              type="text"
              v-model.trim="newAlumno.madreCedula"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cedula de la Madre"
            />

            <input
              type="text"
              v-model.trim="newAlumno.direccionTrabajoMadre"
              class="form-control block my-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Direccion del trabajo de la Madre"
            />
          </div>

          <div class="form-group mb-6">
            <input
              type="text"
              v-model.trim="newAlumno.padre"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="Padre"
              placeholder="Nombre de Padre"
            />
            <input
              type="text"
              v-model.trim="newAlumno.padreCedula"
              class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cedula del Padre"
            />

            <input
              v-model.trim="newAlumno.direccionTrabajoPadre"
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
              v-model="newAlumno.representante"
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
              v-model="newAlumno.representante"
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

<script>
import { reactive } from "vue";
import {
  firebaseApp,
  saveAlumno,
  evitarDuplicados,
  camposVacios,
} from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: "image/jpeg",
};

export default {
  components: {},
  setup() {
    const items = reactive([]);
    let file = reactive(null);
    const newAlumno = reactive({
      nombre: "",
      apellido: "",
      cedula: "",
      instrumento: "",
      direccion: "",
      grupo: "",
      telefono: "",
      edad: "",
      sexo: "",
      nacimiento: "",
      madre: "",
      madreCedula: "",
      direccionTrabajoMadre: "",
      padre: "",
      padreCedula: "",
      direccionTrabajoPadre: "",
      foto: null,
      id: Date.now().toString(),
      representante: "",
    });
    const archivo = (e) => {
      file = e.target.files[0];
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, "fotos/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Proceso de la carga " + progress + "% ");
          switch (snapshot.state) {
            case "paused":
              console.log("Carga pausada");
              break;
            case "running":
              console.log("Carga Completa");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("URL de descarga: " + downloadURL);
            newAlumno.foto = downloadURL;
          });
        }
      );
    };
    const limpiar = () => {
      newAlumno.nombre = "";
      newAlumno.apellido = "";
      newAlumno.direccion = "";
      newAlumno.grupo = "";
      newAlumno.telefono = "";
      newAlumno.instrumento = "";
      newAlumno.edad = "";
      newAlumno.sexo = "";
      newAlumno.nacimiento = "";
      newAlumno.madre = "";
      newAlumno.madreCedula = "";
      newAlumno.direccionTrabajoMadre = "";
      newAlumno.padre = "";
      newAlumno.padreCedula = "";
      newAlumno.direccionTrabajoPadre = "";
      newAlumno.foto = null;
      newAlumno.representante = "";
    };
    const validar = async () => {
      // console.log(await evitarDuplicados(newAlumno));
      try {
        camposVacios(newAlumno) //Comprobar si hay campos vacios
          ? (await evitarDuplicados(newAlumno)) //Comprobar en la BD si ya existe
            ? (await saveAlumno(newAlumno)) //Guardar en la BD
              ? limpiar() //Limpiar los campos
              : alert("Error al guardar")
            : alert("Alumno duplicado")
          : alert("Campos vacios");
      } catch (error) {
        alert("Ya existe un alumno con ese nombre");
        alert(error);
      }
    };

    return { items, newAlumno, validar, archivo };
  },
};
</script>
