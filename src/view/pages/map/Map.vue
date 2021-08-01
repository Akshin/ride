<template>
  <div>Карты (в разработке)</div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Карта", route: { name: "map" } }
    ]);
  }
};
</script>

<style scoped></style>
