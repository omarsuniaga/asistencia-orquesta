<template>
  <section>
    <!-- listado de alumnos en tailwind -->
    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow-md overflow-hidden sm:rounded-lg">
          <div
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <h1 class="text-black mx-3 text-center">LISTADO</h1>
          </div>
          <table class="min-w-full divide-gray-200">
            <div>
              <router-link
                v-for="item in LISTADOS"
                :key="item.id"
                class="hover:bg-violet-400 divide-gray-800 bg-white active:bg-violet-600 border-b border-gray-400 flex justify-between m-2"
                :to="{
                  name: 'Alumno',
                  paths: '/Alumno:' + item.id,
                  params: { id: item.id },
                }"
              >
                <div class="h-14 w-14 m-1">
                  <img class="rounded-full" :src="item.foto" alt="" />
                </div>
                <div class="px-1 py-1">
                  <div class="flex text-center">
                    <div class="ml-2">
                      <div class="text-sm font-medium text-gray-900">
                        {{ item.nombre }}
                        {{ item.apellido }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ item.grupo }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="m-2 flex items-center">
                  <font-awesome-icon
                    :icon="['fas', 'angle-right']"
                    class="mr-1"
                  />
                </div>
              </router-link>
            </div>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getAlumnos,
  deleteAlumno,
  onSnapshot,
  collection,
  db,
} from "../firebase.js";
import { defineComponent, ref, reactive, watchEffect } from "vue";
import Loading from "@/components/Loading.vue";
export default defineComponent({
  name: "Dashboard",
  components: {
    Loading,
  },
  setup() {
    /**Variables Globales */
    const LISTADOS = reactive([]);
    const loading = ref(false);
    // watchEffect(() => LISTADOS);

    /* Metodos */
    const getListado = async () => {
      onSnapshot(collection(db, "ALUMNOS"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          LISTADOS.push({
            ...doc.data(),
            // id: doc.id,
          });
        });
      });
    };

    const delect = async (id) => {
      await deleteAlumno(id);
      console.log("Eliminando...", id);
      return;
    };
    const edit = async (id) => {
      console.log("Editando...", id);
    };

    getListado();
    return {
      loading,
      LISTADOS,
      getAlumnos,
      delect,
      edit,
      deleteAlumno,
    };
  },
});
</script>
