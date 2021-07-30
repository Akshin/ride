<template>
  <div>
    <!--begin::Header -->
    <div
      class="
        d-flex
        flex-column flex-center
        py-10
        bgi-size-cover bgi-no-repeat
        rounded-top
      "
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="text-white font-weight-bold">Роли</h4>
      <span class="btn btn-success btn-sm font-weight-bold font-size-sm mt-2">
        {{ getUserRoleNames }}
      </span>
    </div>
    <!--end::Header -->

    <!--begin::Nav -->
    <div class="row row-paddingless">
      <!--begin:Item-->
      <template v-for="(role, i) in getUserRoles">
        <div class="col-6" v-bind:key="i">
          <router-link
            to="/"
            class="
              d-block
              py-10
              px-5
              text-center
              bg-hover-light
              border-right border-bottom
            "
          >
            <!-- media/svg/icons/Communication/Group.svg -->
            <span class="svg-icon svg-icon-3x svg-icon-success">
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Communication/Group.svg" />
              <!--end::Svg Icon-->
            </span>
            <span
              class="
                d-block
                text-dark-75
                font-weight-bold font-size-h6
                mt-2
                mb-1
              "
            >
              {{ ru[role.name] }}
            </span>
            <span class="d-block text-dark-50 font-size-lg">
              {{ role.name }}
            </span>
          </router-link>
        </div>
      </template>
      <!--end:Item-->
    </div>
    <!--end::Nav -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ru from "@/core/locale/ru";

export default {
  name: "KTDropdownQuickAction",
  data() {
    return {
      ru,
    };
  },
  computed: {
    ...mapGetters(["getUserRoleNames", "getUserRoles"]),

    getFullName() {
      if (!this.user.data) return "";
      if (this.user.data.name) return this.user.data.name;
      return this.user.login;
    },

    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    },
  },
};
</script>
