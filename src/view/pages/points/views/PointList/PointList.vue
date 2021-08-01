<template>
  <div class="card card-custom">
    <v-card>
      <v-card-title>
        Список диктующих точек (Пермь)
        <v-spacer></v-spacer>
        <button
          class="btn btn-primary font-weight-bold text-uppercase"
          @click="
            $router.push({ name: 'PointCreateAddress', params: { id: 'new' } })
          "
        >
          Новая ДТ
        </button>
      </v-card-title>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="points"
        :search="search"
        :items-per-page="15"
        show-select
        item-key="name"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import api from "@/core/api";

export default {
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "Название ДТ", value: "name" },
        { text: "Адрес ДТ", value: "address" },
        { text: "Дата создания", value: "createdAt" },
        // { text: "Статус", value: "status" },
        { text: "Действия", value: "actions", sortable: false }
      ],
      points: []
    };
  },
  methods: {
    init() {
      api.getPoints().then(({ data }) => {
        const points = data.reverse();
        this.points = points.map(point => ({
          name: point.name,
          address: point.data?.inspection?.address,
          createdAt: point.data.createdAt,
          actions: "",
          id: point.id
        }));
      });
    },
    editItem(item) {
      console.log(item);
      this.$router.push({
        name: "PointEditAddress",
        params: { id: item.id }
      });
    },
    deleteItem(item) {
      console.log(item);
    }
  },
  beforeMount() {
    this.init();
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Список диктующих точек", route: { name: "points" } }
    ]);
  }
};
</script>

<style lang="scss" scoped></style>
