<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark">
        <span class="text-muted font-weight-bold mr-2">
          {{ new Date().getFullYear() }} &nbsp;&copy;&nbsp;
        </span>
        <a class="text-dark-75 text-hover-primary"> Labinst (Лабинструмент) </a>
      </div>
      <div class="nav nav-dark">
        <a class="nav-link pr-3 pl-0"> О нас </a>
        <a class="nav-link pl-3 pr-0"> Контакты </a>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
