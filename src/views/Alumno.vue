<template>
  <section class="section">
    <figure class="bg-slate-100 rounded-xl p-8 dark:bg-sky-300">
      <img
        class="w-40 h-40 rounded-full mx-auto"
        :src="ALUMNO.foto"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 text-center space-y-4">
        <figcaption class="font-medium">
          <div class="text-sky-500 dark:text-sky-400">
            {{ ALUMNO.nombre }} {{ ALUMNO.apellido }}
          </div>
          <div class="text-slate-700 dark:text-slate-500">
            {{ ALUMNO.grupo }} - {{ ALUMNO.instrumento }}
          </div>
        </figcaption>
        <blockquote class="text-left">
          Padres
          <p class="text-lg font-medium">
            {{ ALUMNO.madre }} y {{ ALUMNO.padre }}
          </p>
          Asistencias e Inasistencias
          <p class="text-lg font-medium">Hay que Generar la Grafica</p>
          Telefono
          <p class="text-lg font-medium">
            {{ ALUMNO.telefono }}
          </p>
          Direccion
          <p class="text-lg font-medium">
            {{ ALUMNO.direccion }}
          </p>
        </blockquote>
      </div>
    </figure>
  </section>
</template>
<script setup>
import { provide, onMounted, ref, watchEffect } from "vue";
import { searchAlumno } from "../firebase.js";
import { useRouter } from "vue-router";
const id = useRouter().currentRoute._rawValue.params.id;
const ALUMNO = ref({});
// export default defineComponent({
//   name: "Alumno",
//   setup() {
//     /* Metodos */
//     // const alumnoID = $route.params.id;

//     // searchAlumnos(alumnoID);

//     return {};
//   },
// });
// console.log(searchAlumnos("NzREc3MypeuCYNS1yYOG"));
onMounted(async () => {
  await searchAlumno(id).then((alumno) => {
    ALUMNO.value = alumno;
  });
});
</script>
