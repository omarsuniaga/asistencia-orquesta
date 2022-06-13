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
    <div class="pt-1 m-1 align-middle inline-block sm:px-6 lg:px-8">
      <div class="shadow-md sm:rounded-lg">
        <table class="w-44 divide-gray-300">
          <thead>
            <h1
              class="text-black mx-3 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              PRESENTES
            </h1>
          </thead>

          <tbody class="divide-gray-800 bg-green-200">
            <tr
              v-for="item in PRESENTES"
              :key="item.id"
              class="hover:bg-violet-400 px-4 active:bg-violet-600 border-b border-gray-400 flex gap-1"
              @click="remove(item)"
            >
              <div class="flex-none h-14">
                <td v-if="item.foto">
                  <img class="rounded-full w-10 h-10" :src="item.foto" alt="" />
                </td>
                <td v-else>
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
