<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        <template v-for="(value, key, i) in actSorted">
          <div :key="i" class="mb-10">
            <h2 class="text-subtitle-1 font-weight-bold">
              {{ key }}
              <v-btn
                v-if="i === 0"
                color="secondary"
                plain
                small
                @click="dialog = true"
              >
                Добавить поле
              </v-btn>
            </h2>
            <div class="input-wrapper" v-for="(actField, i) in value" :key="i">
              <div>{{ actDict[actField] || actField }}</div>
              <div>
                <v-text-field
                  v-model="act[actField]"
                  hide-details="auto"
                  :disabled="inputIsDisabled(actField)"
                />
              </div>
            </div>
          </div>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onSave" color="primary" width="160" :disabled="disabled">
          Далее
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title> Введите название поля </v-card-title>
        <v-card-text>
          <v-text-field label="Поле" v-model="newField.key" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addField">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/api";

import {
  act,
  actDict,
  actSorted,
  disabledInputs
} from "@/apps/points/data/act";

import getFullness from "@/utils/getFullness";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      act,
      actDict,
      actSorted,
      address: {},
      dialog: false,

      newField: {
        key: "",
        value: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      profile: "core$common/user"
    }),
    disabled() {
      return (
        !this.act.contactName ||
        !this.act.contactPhone ||
        !this.act.hotScheme ||
        !this.act.hidroelevator
      );
    }
  },
  methods: {
    onSave() {
      if (this.disabled) return;

      api
        .setInspections({
          object_id: this.address.id,
          data: {
            data: this.act,
            status: getFullness(this.act)
          }
        })
        .then(resp => {
          localStorage.setItem("act", JSON.stringify(resp.data));
          this.$router.push({ path: "/points/create/specification" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    inputIsDisabled(actField) {
      return disabledInputs.includes(actField);
    },
    addField() {
      this.$set(
        this.actSorted["ОБЩЕЕ"],
        this.actSorted["ОБЩЕЕ"].length,
        this.newField.key
      );

      this.newField.key = "";
      this.dialog = false;
    }
  },
  mounted() {
    this.address = JSON.parse(localStorage.getItem("address"));
    this.act.date = new Date();
    this.act.address = this.address.data.value;
    this.act.addressName = this.address.name;

    const profile = this.profile.data;
    this.act.user = `${profile.email} ${profile.name} ${profile.name}`;
  }
};
</script>

<style lang="scss" scoped></style>
