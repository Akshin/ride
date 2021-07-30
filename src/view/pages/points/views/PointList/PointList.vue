<template>
  <div>
    <div
      v-for="(point, i) in points"
      :key="i"
      class="d-flex flex-column align-start pa-2"
    >
      <span class="text-subtitle-2">{{ point.name }}</span>
      <em class="text-caption"> {{ point.data.value }} </em>
      <v-btn
        color="secondary"
        plain
        @click="
          $router.push({ name: 'PointAddressEdit', params: { id: point.id } })
        "
      >
        Паспорт
      </v-btn>
      <v-progress-linear :value="65" height="1" color="secondary" />
      <!-- <v-divider style="width: 100%"></v-divider> -->
    </div>
  </div>
</template>

<script>
import api from "@/core/api";

export default {
  data() {
    return {
      points: [],
      knowledge: 10,
    };
  },
  methods: {
    init() {
      api.getObjects().then(({ data }) => {
        this.points = data.reverse();
      });
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style lang="scss" scoped></style>
