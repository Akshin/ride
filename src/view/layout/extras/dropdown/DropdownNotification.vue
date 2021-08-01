<template>
  <div>
    <div
      class="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="d-flex flex-center rounded-top">
        <span class="text-white">Оповещания</span>
        <span
          class="
            btn btn-text btn-success btn-sm
            font-weight-bold
            btn-font-md
            ml-2
          "
        >
          0 новых
        </span>
      </h4>

      <ul
        class="
          nav
          nav-bold
          nav-tabs
          nav-tabs-line
          nav-tabs-line-3x
          nav-tabs-line-transparent-white
          nav-tabs-line-active-border-success
          mt-3
          px-8
        "
        role="tablist"
      >
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="0"
            class="nav-link active"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Оповещания
          </a>
        </li>
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="2"
            class="nav-link"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Логи
          </a>
        </li>
      </ul>
    </div>

    <b-tabs class="hide-tabs" v-model="tabIndex">
      <b-tab active class="p-8">
        <div class="d-flex flex-center text-center text-muted min-h-200px">
          Нет сообщений
        </div>
      </b-tab>

      <b-tab>
        <div class="d-flex flex-center text-center text-muted min-h-200px">
          В логах пусто
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
export default {
  name: "KTDropdownNotification",
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    setActiveTab(event) {
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(event.target.getAttribute("data-tab"));

      // set current active tab
      event.target.classList.add("active");
    }
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
