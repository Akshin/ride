<template>
  <div>
    <div class="card card-custom mb-8">
      <div class="card-body p-0">
        <v-stepper flat alt-labels class="transparent my-6">
          <v-stepper-header>
            <template v-for="(step, i) in steps">
              <v-divider v-if="i !== 0" :key="'divider' + i" />
              <v-stepper-step
                :step="i + 1"
                :complete="currentStep > i"
                :key="'stepper' + i"
                class="caption"
                :editable="!isCreatingMode"
                @click="onStepClicked(step)"
              >
                {{ step.title }}
              </v-stepper-step>
            </template>
          </v-stepper-header>
        </v-stepper>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { steps } from "../../data/stepsToCreatePoint";

export default {
  data() {
    return {
      currentStep: 0,
      isCreatingMode: true,
      steps
    };
  },
  methods: {
    checkRoute(name) {
      this.isCreatingMode = name.includes("Create");
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: this.isCreatingMode ? "Создание ДТ" : "Редактирование ДТ" }
      ]);
      this.setStep(name);
    },
    setStep(routeName) {
      this.currentStep = steps.findIndex(step => {
        return step.routes.includes(routeName);
      });
    },
    onStepClicked(step) {
      if (this.isCreatingMode) return;
      this.$router.push({
        name: step.routes[1],
        params: { id: this.$route.params.id }
      });
    }
  },
  created() {
    const routeName = this.$route.name;
    this.checkRoute(routeName);
  },
  watch: {
    "$route.name"(routeName) {
      this.checkRoute(routeName);
    }
  }
};
</script>

<style lang="scss" scoped></style>
