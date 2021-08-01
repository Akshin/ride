<template>
  <div>
    <v-card>
      <v-card-text>
        <v-file-input
          accept="image/*"
          label="Загрузите схему"
          @change="uploadFile"
        ></v-file-input>
        <v-img :src="image" max-width="800"></v-img>
      </v-card-text>

      <v-card-text
        v-for="(value, key, i) in spec"
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
                  <span v-if="col !== 'cipher' && col !== 'serial'">{{
                    data[col]
                  }}</span>
                  <v-text-field
                    v-else
                    v-model="data[col]"
                    hide-details="auto"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160" :disabled="disabled">
          Далее
        </v-btn>
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
      specs,
      spec: {},
      address: {},
      columns: ["name", "unit", "quantity", "desc", "cipher", "serial"],
      columnLabels,
      image: "",
      imageLink: "",
      loading: false,

      showenFields: specs.slice(0, 3)
    };
  },
  computed: {
    disabled() {
      if (this.loading) return true;

      // for (let key in this.spec) {
      //   const fullfill = this.spec[key].every((el) => el.cipher && el.serial);
      //   if (!fullfill) return true;
      // }

      return false;
    }
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
      api
        .setSensorSchemes({
          data: {
            data: this.spec,
            image: this.imageLink,
            status: 100
          },
          object_id: this.address.id
        })
        .then(resp => {
          localStorage.setItem("scheme", JSON.stringify(resp.data));
          this.$router.push({ path: "/points/create/configuration" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    getColumnLabel(col) {
      return this.columnLabels[col];
    },
    getSpecName(key) {
      return this.specs.find(spec => spec.field === key)?.title || key;
    }
  },
  beforeMount() {
    this.address = JSON.parse(localStorage.getItem("address"));
    const spec = JSON.parse(localStorage.getItem("spec")).data.data;

    const res = {};
    for (let sp in spec) {
      if (!spec[sp].length) continue;

      res[sp] = [];
      const dataArray = spec[sp];
      dataArray.forEach(obj => {
        const q = parseInt(obj.quantity);
        for (let i = 1; i <= q; i++) {
          const newObj = Object.assign({}, obj);
          newObj.quantity = 1;
          newObj.cipher = "";
          newObj.serial = "";
          res[sp].push(newObj);
        }
      });
    }
    this.spec = res;
  }
};
</script>

<style lang="scss" scoped></style>
