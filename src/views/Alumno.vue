<template>
  <section class="section">
    <figure class="bg-slate-100 rounded-xl p-2 dark:bg-sky-300">
      <img
        class="w-40 h-40 rounded-full mx-auto"
        :src="ALUMNO.foto"
        alt=""
        width="150"
        height="150"
      />
      <div class="pt-6 text-center space-y-1">
        <router-link
          :to="{
            name: 'EditarAlumno',
            paths: '/Edit:' + ALUMNO.id,
            params: { id: ALUMNO.id },
          }"
        >
          <span class="material-symbols-outlined px-6"> edit </span>
        </router-link>

        <span class="material-symbols-outlined px-6"> delete </span>
        <figcaption class="font-medium">
          <div class="text-blue-700 dark:text-red-500">
            {{ ALUMNO.nombre }} {{ ALUMNO.apellido }}
          </div>
          <div class="text-slate-700 dark:text-slate-500">
            {{ ALUMNO.grupo }} - {{ ALUMNO.instrumento }}
          </div>
        </figcaption>
        <blockquote class="text-left">
          <p class="text-sm font-medium">Padres</p>
          {{ ALUMNO.madre }} y {{ ALUMNO.padre }}
          <p class="text-sm font-medium">Asistencias</p>
          {{ ALUMNO.asistencia }}
          <p class="text-sm font-medium">Tlf: {{ ALUMNO.telefono }}</p>

          <p class="text-sm font-medium">Direccion</p>
          {{ ALUMNO.direccion }}
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
onMounted(async () => {
  await searchAlumno(id).then((alumno) => {
    ALUMNO.value = alumno;
  });
});
</script>
