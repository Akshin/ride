<template>
  <ul
    class="
      breadcrumb breadcrumb-transparent breadcrumb-dot
      font-weight-bold
      p-0
      my-2
      font-size-sm
    "
  >
    <li class="breadcrumb-item text-muted">
      <a href="" class="text-muted">Features</a>
    </li>
    <li class="breadcrumb-item text-muted">
      <a href="" class="text-muted">Cards</a>
    </li>
    <li class="breadcrumb-item text-muted">
      <a href="" class="text-muted">Sticky Cards</a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route: {
      handler(val) {
        console.log(val);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
</style>