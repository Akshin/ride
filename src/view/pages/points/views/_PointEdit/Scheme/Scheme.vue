<template>
  <div>
    <v-card>
      <div id="sss"></div>
      <v-card-text>
        <v-file-input
          accept="image/*"
          label="Загрузите схему"
          @change="uploadFile"
          :disabled="readonly"
        ></v-file-input>
        <v-img :src="image" max-width="800"></v-img>
      </v-card-text>

      <template v-if="data.data && data.data.data">
        <v-card-text
          v-for="(value, key) in data.data.data"
          :key="key"
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
                    <span v-if="col !== 'cipher' && col !== 'serial'">{{
                      data[col]
                    }}</span>
                    <v-text-field
                      v-else
                      v-model="data[col]"
                      hide-details="auto"
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
import { mapGetters } from "vuex";

import specs from "@/apps/points/data/specs";
import columnLabels from "@/apps/points/data/columnLabels";

export default {
  data() {
    return {
      specs,
      columns: ["name", "unit", "quantity", "desc", "cipher", "serial"],
      columnLabels,
      data: {},
      image: "",
      imageLink: "",
      readonly: true,

      showenFields: specs.slice(0, 3)
    };
  },
  computed: {
    disabled() {
      if (this.readonly || this.loading) return true;

      // for (let key in this.spec) {
      //   const fullfill = this.spec[key].every((el) => el.cipher && el.serial);
      //   if (!fullfill) return true;
      // }

      return false;
    },
    ...mapGetters({
      address: "points$points/address"
    })
  },
  methods: {
    isShowenField(key) {
      return this.showenFields.some(el => el.field === key);
    },
    uploadFile(file) {
      if (!file) {
        this.image = "";
        this.imageLink = "";
        return;
      }
      this.image = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("uploaded_file", file);
      this.loading = true;
      api
        .uploadFile(formData)
        .then(resp => {
          this.imageLink = resp.data.file;
        })
        .finally(() => (this.loading = false));
    },
    onSave() {
      this.data.data.image = this.imageLink;

      api
        .putSensorSchemes(this.data.id, this.data)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    getColumnLabel(col) {
      return this.columnLabels[col];
    },
    getSpecName(key) {
      return this.specs.find(spec => spec.field === key)?.title;
    }
  },
  created() {
    api.getSensorSchemes(this.$route.params.id).then(resp => {
      this.data = resp.data[0];
      const filename = this.data.data.image;
      this.image = api.getFile(filename);
    });
  }
};
</script>

<style lang="scss" scoped></style>
