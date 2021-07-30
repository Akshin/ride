<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text
        v-for="(value, key, i) in scheme"
        :key="i"
        class="mb-2"
        v-show="isShowenField(key)"
      >
        <h3 class="text-h6 mb-4">{{ getSpecName(key) }}</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="(col, i) in columns" :key="i" class="text-left">
                  {{ getColumnLabel(col) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in value" :key="i">
                <td v-for="(col, idx) in columns" :key="idx">
                  <span v-if="col !== 'period'">{{ data[col] }}</span>
                  <v-text-field
                    v-else
                    v-model="data[col]"
                    hide-details="auto"
                    type="number"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
import columnLabels from "@/apps/points/data/columnLabels";

export default {
  data() {
    return {
      scheme: {},
      address: {},
      specs,
      columns: [
        "name",
        "unit",
        "quantity",
        "desc",
        "cipher",
        "serial",
        "period",
      ],
      columnLabels,
      showenFields: specs.slice(0, 3),
    };
  },
  methods: {
    isShowenField(key) {
      return this.showenFields.some((el) => el.field === key);
    },
    getStatus() {
      return (
        (JSON.parse(localStorage.getItem("scheme")).data.status +
          JSON.parse(localStorage.getItem("act")).data.status +
          JSON.parse(localStorage.getItem("spec")).data.status) /
        3
      );
    },
    onSave() {
      api
        .setConfigurations({
          data: {
            data: this.scheme,
            status: this.getStatus(),
          },
          object_id: this.address.id,
        })
        .then(() => {
          localStorage.removeItem("scheme");
          localStorage.removeItem("act");
          localStorage.removeItem("address");
          localStorage.removeItem("spec");
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    getColumnLabel(key) {
      return this.columnLabels[key];
    },
    getSpecName(key) {
      return this.specs.find((spec) => spec.field === key).title;
    },
  },
  beforeMount() {
    this.address = JSON.parse(localStorage.getItem("address"));
    const scheme = JSON.parse(localStorage.getItem("scheme")).data.data;

    for (let key in scheme) {
      if (scheme[key].length) {
        scheme[key].forEach((row, i) => (scheme[key][i]["period"] = 1));
      }
    }

    this.scheme = scheme;
  },
};
</script>

<style lang="scss" scoped></style>
