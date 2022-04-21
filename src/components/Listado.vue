<script setup>
import { inject } from "vue";
const LISTADOS = inject("LISTADOS");
const PRESENTES = inject("PRESENTES");
const AUSENTES = inject("AUSENTES");
const add = async (item) => {
  LISTADOS.value.map((e) =>
    e.id === item.id ? (e.estado = true) && addPresent(e) : null
  );
};

const addPresent = (item) => {
  LISTADOS.value = LISTADOS.value.filter((e) => e.estado !== true);
  PRESENTES.value.push({
    ...item,
    estado: true,
  });
};
</script>

<template>
  <div>
    <div class="pt-1 m-1 align-middle inline-block sm:px-6 lg:px-8">
      <div class="shadow-md sm:rounded-lg">
        <table class="w-full divide-gray-300">
          <thead>
            <h1
              class="text-black mx-3 px-6 py-3 text-xs font-medium uppercase tracking-wider text-center"
            >
              LISTADO
            </h1>
          </thead>

          <tbody class="divide-gray-800 bg-red-200">
            <tr
              v-for="item in LISTADOS"
              :key="item.id"
              class="hover:bg-violet-400 active:bg-violet-600 border-b border-gray-400 flex gap-1 items-center justify-items-center align-middle"
              @click="add(item)"
            >
              <td class="flex-shrink-0 w-12 pt-1">
                <img class="rounded-full" :src="item.foto" alt="" />
              </td>
              <th class="items-center">
                <div class="p-1">
                  <div class="text-[12px] font-medium text-black">
                    {{ item.nombreCompleto }}
                  </div>
                  <div class="text-[10px] text-gray-500 font-sans">
                    {{ item.grupo }}
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
