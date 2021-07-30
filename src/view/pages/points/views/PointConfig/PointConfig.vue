<template>
  <div>
    <v-stepper flat alt-labels class="transparent my-6">
      <v-stepper-header>
        <template v-for="(step, i) in createSteps">
          <v-divider v-if="i !== 0" :key="'divider' + i" />
          <v-stepper-step
            :step="i + 1"
            :complete="currentStep > i"
            :key="'stepper' + i"
            color="secondary"
            class="caption"
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
import { createSteps } from "@/apps/points/data/stepsToCreatePoint";

export default {
  data() {
    return {
      currentStep: 0,
      createSteps,
    };
  },
  methods: {
    setStep(routeName) {
      this.currentStep = createSteps.findIndex((step) => {
        return step.route.name === routeName;
      });
    },
  },
  created() {
    const routeName = this.$route.name;
    this.setStep(routeName);
  },
  watch: {
    "$route.name"(routeName) {
      this.setStep(routeName);
    },
  },
};
</script>

<style lang="scss" scoped></style>
