<template>
  <div
    class="d-flex justify-content-center align-items-center secondary--text"
    style="width: 100%; height: 100vh"
  >
    <div class="d-flex flex-column align-items-center">
      <inline-svg
        src="media/svg/logos/logo.svg"
        class="mb-12 logo"
      ></inline-svg>
      <h1 class="text-h3 font-weight-medium mb-12">Дом на ладони</h1>
      <p class="font-weight-light" style="margin-bottom: 15vh">
        Сервис для удаленного управления жизнью объекта
      </p>
      <v-btn large :width="250" class="my-btn" @click="login"> Войти </v-btn>
    </div>
  </div>
</template>

<script>
import getReturnUrl from "@/core/utils/getReturnUrl";

export default {
  methods: {
    login() {
      const path = getReturnUrl();
      window.open(path, "_self");
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  fill: var(--v-primary-darken4);
  max-width: 150px;
}
.my-btn {
  background: #eec22c;
  color: #000;
}
</style>
