<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <v-text-field
          label="Название диктующей точки"
          prepend-icon="mdi-card-text-outline"
          v-model="pointName"
        />
        <v-autocomplete
          v-model="address"
          :loading="loading"
          :items="options"
          :search-input.sync="searchAddress"
          item-text="value"
          label="Введите адрес объекта"
          placeholder="Начните воодить адрес объекта"
          prepend-icon="mdi-map-marker"
          hide-no-data
          no-filter
          return-object
        />
      </v-card-text>
      <v-card-subtitle>
        <v-alert
          outlined
          type="info"
          dense
          class="overline"
          prominent
          border="left"
        >
          ДАННЫЕ БЕРУТСЯ ИЗ ФЕДЕРАЛЬНОЙ ИНФОРМАЦИОННОЙ АДРЕСНОЙ СИСТЕМЫ (ФИАС)
        </v-alert>
      </v-card-subtitle>

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

export default {
  data() {
    return {
      loading: false,
      pointName: "",
      searchAddress: null,
      address: {},
      options: []
    };
  },
  watch: {
    searchAddress(val) {
      this.fetchEntriesDebounced(val);
    }
  },
  computed: {
    disabled() {
      return !this.pointName.length || !this.address.value;
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
    onSave() {
      if (this.disabled) return;

      api
        .setObjects({
          name: this.pointName,
          data: this.address
        })
        .then(resp => {
          localStorage.setItem("address", JSON.stringify(resp.data));
          this.$router.push({ path: "/points/create/act" });
        })
        .catch(() => alert("Ошибка сервера"));
    },
    fetchEntriesDebounced(val) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.remoteMethod(val);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped></style>
