<template>
  <div class="card card-custom card-sticky" id="kt_page_sticky_card">
    <div class="card-header" style="">
      <div class="card-title">
        <h3 class="card-label">
          Конфигурация <i class="mr-2"></i>
          <small v-if="point.data"
            >{{ point.name }} | {{ point.data.inspection.address }}</small
          >
        </h3>
      </div>
      <div class="card-toolbar">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-success font-weight-bolder"
            @click="onSave"
          >
            Закончить
          </button>
        </div>
      </div>
    </div>
    <div class="card-body" v-if="point.data">
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

      columns: ["name", "desc", "cipher", "serial", "period"],
      options: {
        columnNames: specFields,
        grid: [3, 2, 2, 3, 2],
        disabled: [true, true, true, true, false]
      }
    };
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

      api
        .putPoint(this.$route.params.id, this.point)
        .then(() => {
          this.$router.push({
            name: "points"
          });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    async setTableData(items) {
      await this.$nextTick();
      const refs = this.$refs["tableAdd"];

      for (let i = 0; i < refs.length; i++) {
        const catchedItems = items.filter(
          item => item.subtype === this.specs[i].subtype
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
    });
  }
};
</script>

<style lang="scss" scoped></style>
