<template>
  <div class="row" v-show="show">
    <div class="col-xl-1"></div>
    <div class="col-xl-10">
      <div class="my-5">
        <h3 class="text-dark font-weight-bold mb-10">
          {{ title }}:
          <a @click.prevent="addTableData" v-if="!readonly">
            <span class="svg-icon svg-icon-success svg-icon-2x">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <polygon points="0 0 24 0 24 24 0 24"></polygon>
                  <path
                    d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.3"
                  ></path>
                  <path
                    d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </span>
          </a>
        </h3>
        <div class="row" v-for="(data, idx) in tableData" :key="idx">
          <div
            :class="'col-xl-' + options.grid[i]"
            v-for="(col, i) in columns"
            :key="i"
          >
            <div class="form-group">
              <label v-if="idx === 0">{{ getColumnLabel(col) }}</label>
              <!-- <select
                class="form-control form-control-solid"
                v-if="col === 'unit'"
                v-model="data[col]"
              >
                <option selected value="шт.">шт.</option>
                <option value="м.">м.</option>
              </select> -->
              <input
                :type="
                  col === 'quantity' || col === 'period' ? 'number' : 'text'
                "
                class="form-control form-control-solid"
                :placeholder="getColumnLabel(col)"
                v-model.trim="data[col]"
                :disabled="options.disabled && options.disabled[i]"
              />
            </div>
          </div>
          <div class="col-xl-2" v-if="masters.length && data.type !== 'device'">
            <label v-if="idx === 0"> Мастер устройств </label>
            <select class="form-control form-control-solid" v-model="data.pid">
              <option
                v-for="(master, k) in masters"
                :key="k"
                :value="master.id"
              >
                {{ master.name }}
                ({{ master.desc }})
                {{ master.serial ? " - " + master.serial : "" }}
              </option>
            </select>
          </div>
          <div class="col-xl-1" @click="handleDelete(i)" v-if="!readonly">
            <label v-if="idx === 0">Удалить</label>
            <a class="btn btn-icon btn-light btn-hover-primary">
              <span class="svg-icon svg-icon-md svg-icon-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24"></rect>
                    <path
                      d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                      fill="#000000"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                      fill="#000000"
                      opacity="0.3"
                    ></path>
                  </g>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <v-divider />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    masters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: [],
      show: true
    };
  },
  methods: {
    hide() {
      this.show = false;
    },
    getColumnLabel(col) {
      return this.options?.columnNames[col] || col;
    },
    addTableData() {
      this.tableData.push(Object.assign({}, this._dataStructure));
    },
    handleEdit() {},
    handleDelete(i) {
      this.tableData.splice(i, 1);
    },
    getResult() {
      return this.tableData;
    },
    ////
    setTableData(tableData) {
      this.tableData = tableData;
    }
  },
  created() {
    const dataStructure = {};
    this.columns.forEach(col => {
      dataStructure[col] = "";
      // if (col === "unit") dataStructure[col] = "шт.";
    });
    this._dataStructure = dataStructure;
  },
  async mounted() {
    await this.$nextTick();
    if (!this.masters.length) return;

    this.tableData.forEach((el, i, arr) => {
      if (el.type !== "device" && !el.pid) {
        arr[i].pid = this.masters[0].id;
      }
    });
  }
};
</script>

<style scoped lang="scss"></style>
