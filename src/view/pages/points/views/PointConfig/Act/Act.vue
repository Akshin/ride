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
              <h3 class="text-dark font-weight-bold mb-10">{{ key }}:</h3>
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
    }
  },
  created() {
    api.getPoints().then(resp => {
      this.point = resp.data.find(obj => obj.id === this.$route.params.id);
      const user = this.user.data;
      this.point.data.inspection.contactName = `${user.name} ${user.last_name}`;
      this.point.data.inspection.contactPhone = user.phone;
    });
  }
};
</script>

<style lang="scss" scoped></style>
