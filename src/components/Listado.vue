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
  <div class="">
    <div class="pt-1 m-1 align-middle inline-block sm:px-6 lg:px-8">
      <div class="shadow-md sm:rounded-lg">
        <table class="w-44 divide-gray-300">
          <thead>
            <h1
              class="text-black mx-3 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              LISTADO
            </h1>
          </thead>

          <tbody class="divide-gray-800 bg-red-200">
            <tr
              v-for="item in LISTADOS"
              :key="item.id"
              class="hover:bg-violet-400 active:bg-violet-600 border-b border-gray-400 flex gap-1"
              @click="add(item)"
            >
              <div class="flex-none h-14">
                <td v-if="item.foto">
                  <img class="rounded-full w-10 h-10" :src="item.foto" alt="" />
                </td>
                <td v-else="item.foto">
                  <img
                    class="rounded-full w-10 h-10"
                    src="https://firebasestorage.googleapis.com/v0/b/orquestapuntacana.appspot.com/o/fotos%2Ffoto-incognito.jpg?alt=media&token=f5b82a7c-7508-42e1-891f-14c3f554a26b"
                    alt=""
                  />
                </td>
              </div>
              <div class="flex items-center grow justify-center">
                <th>
                  <div class="text-[14px] font-medium text-black">
                    {{ item.nombreCompleto }}
                  </div>
                </th>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
