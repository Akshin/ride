<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-card-text>
        <p v-if="act.data.data.hotScheme">
          СХЕМА ТЕПЛОСНАБЖЕНИЯ - {{ act.data.data.hotScheme }}
        </p>
        <p v-if="act.data.data.hidroelevator">
          НАЛИЧИЕ ГИДРОЭЛЕВАТОРА - {{ act.data.data.hidroelevator }}
        </p>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <div v-for="(spec, i) in specs" :key="i">
          <TableAdd
            :options="options"
            :columns="columns"
            :title="spec.title"
            ref="tableAdd"
          />
          <v-divider class="my-2" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160"> Далее </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "@/api";
import specs from "@/apps/points/data/specs";
import TableAdd from "@/components/TableAdd/TableAdd.vue";
import columnLabels from "@/apps/points/data/columnLabels";

export default {
  components: { TableAdd },
  data() {
    return {
      columns: ["name", "unit", "quantity", "desc"],
      options: {
        columnNames: columnLabels
      },
      address: {},
      act: {},
      specs
    };
  },
  methods: {
    onSave() {
      const obj = {};
      const refs = this.$refs["tableAdd"];
      for (let i = 0; i < refs.length; i++) {
        const field = this.specs[i].field;
        obj[field] = refs[i].getResult();
      }

      api
        .setSpecifications({
          data: {
            data: obj,
            status: 100
          },
          object_id: this.address.id
        })
        .then(resp => {
          localStorage.setItem("spec", JSON.stringify(resp.data));
          this.$router.push({ path: "/points/create/scheme" });
        })
        .catch(() => alert("Ошибка сервера"));
    }
  },
  beforeMount() {
    this.address = JSON.parse(localStorage.getItem("address"));
    this.act = JSON.parse(localStorage.getItem("act"));
  }
};
</script>

<style lang="scss" scoped></style>
