<template>
  <nav class="t-transition-effect nav-style px-2 md:px-0">
    <div class="t-main-set flex justify-between items-center">
      <h2 class="font-bold text-blue-800 cursor-pointer" @click="goToHome">
        Asistencia System
      </h2>
      <div class="hidden md:block" v-if="user">
        <router-link
          :to="{ name: 'Inicio' }"
          class="nav-link t-transition-effect"
          >Inicio
        </router-link>
        <router-link
          :to="{ name: 'Profile' }"
          class="nav-link t-transition-effect"
        >
          Perfil
        </router-link>
        <router-link
          :to="{ name: 'RegistrarAlumno' }"
          class="nav-link t-transition-effect"
          >Registrar Alumno
        </router-link>
        <a
          class="t-transition-effect py-2 px-4 ml-4 font-heading rounded cursor-pointer bg-error hover:bg-opacity-75"
          @click="signOutUser"
          >Log Out
        </a>
      </div>
      <div class="hidden md:block" v-else>
        <router-link :to="{ name: 'Home' }" class="nav-link t-transition-effect"
          >Inicio
        </router-link>
        <router-link
          :to="{ name: 'Login' }"
          class="nav-link t-transition-effect"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'SignUp' }"
          class="nav-link t-transition-effect"
        >
          Registrar
        </router-link>
      </div>
      <div class="block md:hidden">
        <Menu />
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthState, useSignOut } from "@/firebase";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import Menu from "./Menu.vue";
export default defineComponent({
  components: { Menu },
  setup() {
    const { user } = useAuthState();
    const router = useRouter();
    const signOutUser = async () => {
      await useSignOut();
      await router.replace({ name: "Login" });
    };
    const goToHome = () => {
      router.push({ name: "Home" });
    };
    return { user, signOutUser, goToHome };
  },
});
</script>

<style lang="postcss" scoped>
.nav-style {
  @apply py-4 px-2 top-0 z-10 sticky
  shadow-md bg-white
  bg-opacity-30
  backdrop-filter backdrop-blur-sm;
}
.nav-link {
  @apply py-2 px-4 ml-2 font-heading rounded
  hover:bg-gray-400;
}
</style>
