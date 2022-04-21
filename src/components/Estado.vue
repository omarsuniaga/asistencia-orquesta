<script setup>
import { inject } from "vue";
const PRESENTES = inject("PRESENTES");
const LISTADOS = inject("LISTADOS");

const remove = async (item) => {
  item.estado = false;
  LISTADOS.value.push(item);
  PRESENTES.value = PRESENTES.value.filter((e) => e.estado !== false);
};
</script>

<template>
  <div class="">
    <div class="p-1 align-middle inline-block sm:px-6 lg:px-8">
      <div class="shadow-md sm:rounded-lg">
        <table class="w-full divide-gray-300">
          <thead>
            <h1
              class="text-black mx-3 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              PRESENTES
            </h1>
          </thead>

          <tbody class="divide-gray-800 bg-green-200">
            <div
              v-for="(item, index) in PRESENTES"
              :key="index"
              class="hover:bg-violet-400 px-4 active:bg-violet-600 border-b border-gray-400 flex gap-1 items-center justify-items-center align-middle"
              @click="remove(item)"
            >
              <img :src="item.foto" class="rounded-full w-12 pt-1" alt="" />
              <div
                class="text-[12px] font-medium text-black text-center w-auto"
              >
                <figcaption class="font-medium">
                  <div class="text-sky-500 dark:text-black">
                    {{ item.nombreCompleto }}
                  </div>
                  <div class="text-slate-700 dark:text-blue-900">
                    {{ item.grupo }}
                  </div>
                </figcaption>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
