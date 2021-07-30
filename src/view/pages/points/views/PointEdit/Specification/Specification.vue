<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <div v-for="(spec, i) in specs" :key="i">
          <TableAdd
            :options="options"
            :columns="columns"
            :title="spec.title"
            :readonly="readonly"
            ref="tableAdd"
          />
          <v-divider class="my-2" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160" :disabled="readonly">
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
import specs from "@/apps/points/data/specs";
import { mapGetters } from "vuex";

import TableAdd from "@/components/TableAdd/TableAdd.vue";
import columnLabels from "@/apps/points/data/columnLabels";

export default {
  components: { TableAdd },
  data() {
    return {
      columns: ["name", "unit", "quantity", "desc"],
      options: {
        columnNames: columnLabels,
      },
      specs,
      data: {},
      readonly: true,
    };
  },
  computed: {
    ...mapGetters({
      address: "points$points/address",
    }),
  },
  methods: {
    onSave() {
      const refs = this.$refs["tableAdd"];
      for (let i = 0; i < refs.length; i++) {
        const field = this.specs[i].field;
        this.data.data.data[field] = refs[i].getResult();
      }

      api
        .putSpecifications(this.data.id, this.data)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
  },
  created() {
    api.getSpecifications(this.$route.params.id).then((resp) => {
      this.data = resp.data[0];

      const refs = this.$refs["tableAdd"];
      for (let i = 0; i < refs.length; i++) {
        const field = this.specs[i].field;
        refs[i].setTableData(this.data.data.data[field]);
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
