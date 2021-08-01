<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-xxl-4">
        <div class="card card-custom bg-gray-100 card-stretch gutter-b">
          <div class="card-header border-0 bg-success py-5">
            <h3 class="card-title font-weight-bolder text-white">
              Диктующие точки
            </h3>
          </div>
          <div class="card-body p-0 position-relative overflow-hidden">
            <div
              id="kt_mixed_widget_1_chart2"
              class="card-rounded-bottom bg-success"
              style="height: 200px"
            ></div>
            <div class="card-spacer mt-n25">
              <div class="row m-0">
                <div
                  class="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7"
                >
                  <span
                    class="svg-icon svg-icon-3x svg-icon-warning d-block my-2"
                  >
                  </span>
                  <a class="text-warning font-weight-bold font-size-h6"
                    >Статистика</a
                  >
                </div>
                <div class="col bg-light-primary px-6 py-8 rounded-xl mb-7">
                  <span
                    class="svg-icon svg-icon-3x svg-icon-primary d-block my-2"
                  >
                  </span>
                  <a
                    @click.prevent="
                      $router.push({
                        name: 'PointCreateAddress',
                        params: { id: 'new' }
                      })
                    "
                    class="text-primary font-weight-bold font-size-h6 mt-2"
                    >Новая ДТ</a
                  >
                </div>
              </div>
              <div class="row m-0">
                <div class="col bg-light-danger px-6 py-8 rounded-xl mr-7">
                  <span
                    class="svg-icon svg-icon-3x svg-icon-danger d-block my-2"
                  >
                  </span>
                  <a
                    @click.prevent="$router.push({ name: 'points' })"
                    class="text-danger font-weight-bold font-size-h6 mt-2"
                    >Список ДТ</a
                  >
                </div>
                <div class="col bg-light-success px-6 py-8 rounded-xl">
                  <span
                    class="svg-icon svg-icon-3x svg-icon-success d-block my-2"
                  >
                  </span>
                  <a class="text-success font-weight-bold font-size-h6 mt-2"
                    >Отчеты</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Панель управления", route: { name: "home" } }
    ]);
  }
};
</script>

<style scoped></style>
