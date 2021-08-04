<template>
  <div class="card card-custom card-sticky" id="kt_page_sticky_card">
    <div class="card-header" style="">
      <div class="card-title">
        <h3 class="card-label">
          Акт обследования объекта <i class="mr-2"></i>
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
      <form class="form" id="kt_form">
        <div
          class="row"
          v-for="(value, key, i) in actSorted"
          :key="i"
          v-show="value.length"
        >
          <div class="col-xl-2"></div>
          <div class="col-xl-8">
            <div class="my-5">
              <h3 class="text-dark font-weight-bold mb-10">
                {{ key }}:
                <v-dialog max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <a v-bind="attrs" v-on="on">
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
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-card-title class="text-h5">
                        Введите название поля
                      </v-card-title>
                      <v-card-text>
                        <input
                          class="form-control"
                          type="text"
                          v-model.trim="newField"
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click.prevent="
                            dialog.value = false;
                            onAddField(key);
                          "
                        >
                          Добавить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </h3>
              <div
                class="form-group row"
                v-for="(actField, i) in value"
                :key="i"
              >
                <label for="objectName" class="col-3 col-form-label">{{
                  actDict[actField] || actField
                }}</label>
                <div class="col-9">
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="point.data.inspection[actField]"
                    :disabled="inputIsDisabled(actField)"
                  />
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
import { mapGetters } from "vuex";

import {
  actDict,
  actSorted,
  disabledInputs
} from "@/view/pages/points/data/act";

export default {
  data() {
    return {
      newField: "",

      point: {},
      actDict,
      actSorted,
      disabledInputs
    };
  },
  computed: {
    ...mapGetters(["user"]),
    disabled() {
      if (!this.point.data) return true;
      return (
        !this.point.data.inspection.contactName ||
        !this.point.data.inspection.contactPhone ||
        !this.point.data.inspection.hotScheme ||
        !this.point.data.inspection.hotHidroelevator
      );
    }
  },
  methods: {
    onSave() {
      if (this.disabled) return;

      this.point.data.inspectionTitles = this.actSorted;

      api
        .putPoint(this.$route.params.id, this.point)
        .then(() => {
          const isCreateMode = this.$route.name.includes("Create");
          if (!isCreateMode) return this.$router.push({ name: "points" });
          this.$router.push({
            name: "PointCreateSpecification",
            params: { id: this.$route.params.id }
          });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    inputIsDisabled(actField) {
      return disabledInputs.includes(actField);
    },
    onAddField(key) {
      this.actSorted[key].push(this.newField);
      this.newField = "";
    }
  },
  created() {
    api.getPoints().then(resp => {
      this.point = resp.data.find(obj => obj.id === this.$route.params.id);
      if (this.point.data.inspectionTitles) {
        this.actSorted = this.point.data.inspectionTitles;
      }
      const user = this.user.data;
      this.point.data.inspection.contactName = `${user.name} ${user.last_name}`;
      this.point.data.inspection.contactPhone = user.phone;
    });
  }
};
</script>

<style lang="scss" scoped></style>
