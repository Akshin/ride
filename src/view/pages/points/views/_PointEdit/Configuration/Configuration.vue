<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-divider />
      <template v-if="data.data && data.data.data">
        <v-card-text
          v-for="(value, key, i) in data.data.data"
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
                      :disabled="readonly"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </template>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160" :disabled="readonly">
          Далее
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
import { mapGetters } from "vuex";

import specs from "@/apps/points/data/specs";
import columnLabels from "@/apps/points/data/columnLabels";

export default {
  data() {
    return {
      specs,
      columns: [
        "name",
        "unit",
        "quantity",
        "desc",
        "cipher",
        "serial",
        "period"
      ],
      columnLabels,
      data: {},
      readonly: true,
      showenFields: specs.slice(0, 3)
    };
  },
  computed: {
    ...mapGetters({
      address: "points$points/address"
    })
  },
  methods: {
    isShowenField(key) {
      return this.showenFields.some(el => el.field === key);
    },
    onSave() {
      api
        .putConfigurations(this.data.id, this.data)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    getColumnLabel(key) {
      return this.columnLabels[key];
    },
    getSpecName(key) {
      return this.specs.find(spec => spec.field === key).title;
    }
  },
  created() {
    api.getConfigurations(this.$route.params.id).then(resp => {
      this.data = resp.data[0];
    });
  }
};
</script>

<style lang="scss" scoped></style>
