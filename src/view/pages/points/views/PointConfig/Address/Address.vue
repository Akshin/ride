<template>
  <div class="card card-custom card-sticky" id="kt_page_sticky_card">
    <div class="card-header" style="">
      <div class="card-title">
        <h3 class="card-label">Адрес диктующей точки <i class="mr-2"></i></h3>
      </div>
      <div class="card-toolbar">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-primary font-weight-bolder"
            :disabled="disabled"
            @click="onSaveBase"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form class="form" id="kt_form">
        <div class="row">
          <div class="col-xl-2"></div>
          <div class="col-xl-8">
            <div class="my-5">
              <h3 class="text-dark font-weight-bold mb-10">Объект:</h3>
              <div class="form-group row">
                <label for="objectName" class="col-3 col-form-label"
                  >Название объекта</label
                >
                <div class="col-9">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Введите название объекта"
                    id="objectName"
                    v-model.trim="pointName"
                  />
                </div>
              </div>
              <div class="form-group row" v-if="isCreateMode">
                <label for="objectAddress" class="col-3 col-form-label"
                  >Адрес объекта</label
                >
                <div class="col-9">
                  <v-autocomplete
                    dense
                    v-model="address"
                    :loading="loading"
                    :items="options"
                    :search-input.sync="searchAddress"
                    item-text="value"
                    placeholder="Начните воодить адрес объекта"
                    hide-no-data
                    no-filter
                    return-object
                  />
                </div>
              </div>
            </div>
            <div class="separator separator-dashed my-10"></div>
            <div class="my-52">
              <h3 class="text-dark font-weight-bold mb-10">Информируем:</h3>
              <div class="form-group row">
                <div class="col-12">
                  <div class="form-text text-muted mt-3">
                    ДАННЫЕ БЕРУТСЯ ИЗ ФЕДЕРАЛЬНОЙ ИНФОРМАЦИОННОЙ АДРЕСНОЙ
                    СИСТЕМЫ (ФИАС)
                    <a href="https://fias.nalog.ru/" target="_blank"
                      >Перейти на сайт ФИАС</a
                    >.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/core/api";
import { pointData } from "../../../data/PointStructure";

export default {
  data() {
    return {
      loading: false,
      pointName: "",
      searchAddress: null,
      address: {},
      options: [],
      point: {}
    };
  },
  watch: {
    searchAddress(val) {
      this.fetchEntriesDebounced(val);
    }
  },
  computed: {
    disabled() {
      if (!this.isCreateMode) return !this.pointName.length;
      return !this.pointName.length || !this.address.value;
    },
    isCreateMode() {
      return this.$route.name.includes("Create");
    }
  },
  methods: {
    async remoteMethod(addr) {
      this.loading = true;
      try {
        const { data } = await api.getAddressAutocomplete(addr);
        this.options = data;
      } catch (err) {
        console.error(err);
        this.options = [];
      } finally {
        this.loading = false;
      }
    },
    onSaveBase() {
      if (this.isCreateMode) return this.onSave();

      this.point.name = this.pointName;
      api
        .putPoint(this.$route.params.id, this.point)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    onSave() {
      if (this.disabled) return;

      const data = Object.assign({}, pointData);
      data.address = this.address.data;
      data.inspection.address = this.address.value;
      data.inspection.pointName = this.pointName;
      data.createdAt = new Date();
      api
        .setPoint({
          name: this.pointName,
          data
        })
        .then(resp => {
          const isCreateMode = this.$route.name.includes("Create");
          if (!isCreateMode) return this.$router.push({ name: "points" });
          this.$router.push({
            name: "PointCreateAct",
            params: { id: resp.data.id }
          });
        })
        .catch(err => {
          alert(err.response.data?.detail || "Ошибка сервера");
        });
    },
    fetchEntriesDebounced(val) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.remoteMethod(val);
      }, 500);
    }
  },
  created() {
    if (this.isCreateMode) return;
    api.getPoints().then(resp => {
      this.point = resp.data.find(obj => obj.id === this.$route.params.id);
      this.pointName = this.point.name;
    });
  }
};
</script>

<style lang="scss" scoped></style>
