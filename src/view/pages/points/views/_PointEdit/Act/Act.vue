<template>
  <div>
    <v-card>
      <v-card-title> Диктующая точка - {{ address.name }} </v-card-title>
      <v-card-subtitle v-if="address.data">
        Адрес - {{ address.data.value }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text v-if="data.data">
        <template v-for="(value, key, i) in actSorted">
          <div :key="i" class="mb-10">
            <h2 class="text-subtitle-1 font-weight-bold">
              {{ key }}
              <v-btn
                v-if="i === 0 && !readonly"
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
                  v-model="data.data.data[actField]"
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
import { mapGetters } from "vuex";

import { actDict, actSorted, disabledInputs } from "@/apps/points/data/act";

import getFullness from "@/utils/getFullness";

export default {
  data() {
    return {
      data: {},
      actDict,
      actSorted,

      dialog: false,

      newField: {
        key: "",
        value: ""
      },

      readonly: true
    };
  },
  computed: {
    ...mapGetters({
      profile: "core$common/user",
      address: "points$points/address"
    }),
    disabled() {
      return (
        this.readonly ||
        !this.data.data.data.contactName ||
        !this.data.data.data.contactPhone ||
        !this.data.data.data.hotScheme ||
        !this.data.data.data.hidroelevator
      );
    }
  },
  methods: {
    onSave() {
      if (this.disabled) return;

      this.data.data.status = getFullness(this.data.data.data);

      api
        .putInspections(this.data.id, this.data)
        .then(() => {
          this.$router.push({ name: "points" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    inputIsDisabled(actField) {
      if (this.readonly) return true;
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
  created() {
    api.getInspections(this.$route.params.id).then(resp => {
      this.data = resp.data[0];
    });
  }
};
</script>

<style lang="scss" scoped></style>
