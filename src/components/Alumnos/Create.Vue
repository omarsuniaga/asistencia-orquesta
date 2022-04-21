<template>
  <div class="bg-blue-300">
    <h2 class="text-center py-1">
      Orquesta Sinfonica Juvenil e infantil de Punta Cana RD
    </h2>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default {
  components: {},
  setup() {
    onMounted(async () => {
      Create();
    });

    const Create = async () => {
      const DATA = { nombre: "Omar" };
      //   try {
      // //...
      //     });
      //   } catch (e) {
      //     console.log("Error getting cached document:", e);
      //   }
    };

    return { Create };
  },
};
</script>

<style></style>
