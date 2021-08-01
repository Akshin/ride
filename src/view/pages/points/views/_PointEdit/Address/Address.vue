<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <v-text-field
          label="Название диктующей точки"
          prepend-icon="mdi-card-text-outline"
          :disabled="readonly"
          v-model="data.name"
        />
        <v-text-field
          v-if="data.data && data.data.value"
          label="Введите адрес объекта"
          prepend-icon="mdi-map-marker"
          disabled
          :value="data.data.value"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160" :disabled="disabled">
          Сохранить
        </v-btn>
      </v-card-actions>

      <v-btn
        v-if="readonly"
        color="warning"
        elevation="1"
        fab
        small
        absolute
        right
        top
        @click="readonly = !readonly"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      readonly: true,
      data: {}
    };
  },
  computed: {
    disabled() {
      return this.readonly || !this.data.name;
    }
  },
  methods: {
    init() {
      api.getObjects().then(resp => {
        const currentObject = resp.data.find(
          obj => obj.id === this.$route.params.id
        );
        this.data = currentObject;
      });
    },
    onSave() {
      if (this.disabled) return;

      api
        .putObjects(this.$route.params.id, this.data)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped></style>
