<template>
  <div>
    <v-stepper flat alt-labels class="transparent my-6">
      <v-stepper-header>
        <template v-for="(step, i) in editSteps">
          <v-divider v-if="i !== 0" :key="'divider' + i" />
          <v-stepper-step
            :step="i + 1"
            :complete="currentStep > i"
            :key="'stepper' + i"
            editable
            color="secondary"
            class="caption"
            @click="onStepClicked(step)"
          >
            {{ step.title }}
          </v-stepper-step>
        </template>
      </v-stepper-header>
    </v-stepper>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { editSteps } from "@/apps/points/data/stepsToCreatePoint";

export default {
  data() {
    return {
      currentStep: 0,
      editSteps,
    };
  },
  methods: {
    ...mapActions({
      getObject: "points$points/getObject",
    }),
    setStep(routeName) {
      this.currentStep = editSteps.findIndex((step) => {
        return step.route.name === routeName;
      });
    },
    onStepClicked(step) {
      if (this.$route.name === step.route.name) return;
      this.$router.push(step.route);
    },
  },
  created() {
    const routeName = this.$route.name;
    this.setStep(routeName);
    this.getObject();
  },
  watch: {
    "$route.name"(routeName) {
      this.setStep(routeName);
    },
  },
};
</script>

<style lang="scss" scoped></style>
