<template>
  <div class="card card-custom card-sticky" id="kt_page_sticky_card">
    <div class="card-header" style="">
      <div class="card-title">
        <h3 class="card-label">
          Схема размещения датчиков и оборудования <i class="mr-2"></i>
          <small v-if="point.data"
            >{{ point.name }} | {{ point.data.inspection.address }}</small
          >
        </h3>
      </div>
      <div class="card-toolbar">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-primary font-weight-bolder"
            @click="onSave"
            :disabled="disabled"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
    <div class="card-body" v-if="point.data">
      <v-file-input
        accept="image/*"
        label="Загрузите схему"
        @change="uploadFile"
      ></v-file-input>
      <v-img :src="image" max-width="800"></v-img>

      <div v-for="(spec, i) in specs" :key="i">
        <TableAdd
          :options="options"
          :columns="columns"
          :title="spec.title"
          ref="tableAdd"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/core/api";
import TableAdd from "@/view/content/TableAdd/TableAdd.vue";

import { specs, specFields } from "@/view/pages/points/data/specs";

export default {
  components: { TableAdd },
  data() {
    return {
      point: {},
      specs,

      columns: ["name", "desc", "cipher", "serial"],
      options: {
        columnNames: specFields,
        grid: [3, 3, 3, 3],
        disabled: [true, true, false, false]
      },

      image: "",
      imageLink: "",
      loading: false
    };
  },
  computed: {
    disabled() {
      if (this.loading) return true;
      return false;
    }
  },
  methods: {
    onSave() {
      const items = [];
      const refs = this.$refs["tableAdd"];
      for (let i = 0; i < refs.length; i++) {
        const res = refs[i].getResult();
        res.forEach(item => items.push(item));
      }

      this.point.data.scheme.items = items;
      this.point.data.scheme.image = this.imageLink;

      api
        .putPoint(this.$route.params.id, this.point)
        .then(() => {
          const isCreateMode = this.$route.name.includes("Create");
          if (!isCreateMode) return this.$router.push({ name: "points" });
          this.$router.push({
            name: "PointCreateConfiguration",
            params: { id: this.$route.params.id }
          });
        })
        .catch(() => alert("Ошибка сервера"));
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
    async setTableData(items) {
      await this.$nextTick();
      const refs = this.$refs["tableAdd"];

      for (let i = 0; i < refs.length; i++) {
        const catchedItems = items.filter(
          item => item.type === this.specs[i].type
        );

        if (catchedItems.length) {
          refs[i].setTableData(catchedItems);
        } else {
          refs[i].hide();
        }
      }
    }
  },
  mounted() {
    api.getPoints().then(resp => {
      this.point = resp.data.find(obj => obj.id === this.$route.params.id);
      this.setTableData(this.point.data.scheme.items);
      const filename = this.point.data.scheme.image;
      if (filename) {
        this.image = api.getFile(filename);
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
