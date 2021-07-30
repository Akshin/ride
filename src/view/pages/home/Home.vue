<template>
  <div>home</div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Панель управления", route: { name: "home" } },
    ]);
  },
};
</script>

<style scoped>
</style>