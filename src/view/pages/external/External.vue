<template>
  <div></div>
</template>

<script>
import api from "@/core/api";
import { auth } from "@/core/services/auth";

export default {
  methods: {
    checkToken() {
      const id = this.$route.query.id;
      if (!id) return this.$router.push({ name: "login" });

      api
        .getToken(id)
        .then(resp => {
          auth.setToken(resp.data.access_token);
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  created() {
    this.checkToken();
  }
};
</script>

<style lang="scss" scoped></style>
