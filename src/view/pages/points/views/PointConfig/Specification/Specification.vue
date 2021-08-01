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
      <div v-for="(spec, i) in specs" :key="i">
        <TableAdd
          :options="options"
          :columns="columns"
          :title="spec.title"
          ref="tableAdd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import api from "@/core/api";
import { specs, specFields } from "@/view/pages/points/data/specs";
import TableAdd from "@/view/content/TableAdd/TableAdd.vue";

export default {
  components: { TableAdd },
  computed: {
    disabled() {
      return false;
    }
  },
  data() {
    return {
      point: {},
      specs,

      columns: ["name", "unit", "quantity", "desc"],
      options: {
        columnNames: specFields,
        grid: [4, 2, 2, 3]
      }
    };
  },
  methods: {
    onSave() {
      const specFieldKeys = Object.keys(specFields);
      const tempspecFieldObj = {};
      specFieldKeys.forEach(key => (tempspecFieldObj[key] = ""));

      const items = [];
      const refs = this.$refs["tableAdd"];
      for (let i = 0; i < refs.length; i++) {
        const res = refs[i].getResult();
        res.forEach(item => {
          const quantity = item.quantity;
          for (let idx = 1; idx <= quantity; idx++) {
            const _item = Object.assign({}, item);
            _item.quantity = 1;
            const obj = Object.assign({}, tempspecFieldObj);
            for (let key in _item) {
              obj[key] = _item[key];
            }
            obj.id = uuidv1();
            obj.type = this.specs[i].type;
            obj.period = 1;
            items.push(obj);
          }
        });
      }

      this.point.data.scheme.items = items;

      api
        .putPoint(this.$route.params.id, this.point)
        .then(() => {
          const isCreateMode = this.$route.name.includes("Create");
          if (!isCreateMode) return this.$router.push({ name: "points" });
          this.$router.push({
            name: "PointCreateScheme",
            params: { id: this.$route.params.id }
          });
        })
        .catch(() => alert("Ошибка сервера"));
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
  created() {
    api.getPoints().then(resp => {
      this.point = resp.data.find(obj => obj.id === this.$route.params.id);
      if (this.point.data.scheme.items.length) {
        this.setTableData(this.point.data.scheme.items);
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
