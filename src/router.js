import Vue from "vue";
import Router from "vue-router";

// function getChildRoutes() {
//   return [
//     {
//       path: "address",
//       name: "PointAddress",
//       component: () =>
//         import("@/view/pages/points/views/PointConfig/Address/Address"),
//     },
//     {
//       path: "act",
//       name: "PointAct",
//       component: () => import("@/view/pages/points/views/PointConfig/Act/Act"),
//     },
//     {
//       path: "scheme",
//       name: "PointScheme",
//       component: () => import("@/view/pages/points/views/PointConfig/Scheme/Scheme"),
//     },
//     {
//       path: "specification",
//       name: "PointSpecification",
//       component: () =>
//         import("@/view/pages/points/views/PointConfig/Specification/Specification"),
//     },
//     {
//       path: "configuration",
//       name: "PointConfiguration",
//       component: () =>
//         import("@/view/pages/points/views/PointConfig/Configuration/Configuration"),
//     },
//   ];
// }

// function getEditChildRoutes() {
//   return [
//     {
//       path: "address",
//       name: "PointAddressEdit",
//       component: () => import("@/view/pages/points/views/PointEdit/Address/Address"),
//     },
//     {
//       path: "act",
//       name: "PointActEdit",
//       component: () => import("@/view/pages/points/views/PointEdit/Act/Act"),
//     },
//     {
//       path: "scheme",
//       name: "PointSchemeEdit",
//       component: () => import("@/view/pages/points/views/PointEdit/Scheme/Scheme"),
//     },
//     {
//       path: "specification",
//       name: "PointSpecificationEdit",
//       component: () =>
//         import("@/view/pages/points/views/PointEdit/Specification/Specification"),
//     },
//     {
//       path: "configuration",
//       name: "PointConfigurationEdit",
//       component: () =>
//         import("@/view/pages/points/views/PointEdit/Configuration/Configuration"),
//     },
//   ];
// }

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/view/pages/home/Home.vue")
        },
        //   {
        //     path: "/points",
        //     name: "points",
        //     component: () => import("@/view/pages/points/views/PointList/PointList"),
        //     meta: { requiresAuth: true },
        //   },
        //   {
        //     path: "/points/create",
        //     name: "PointCreate",
        //     component: () => import("@/view/pages/points/views/PointConfig/PointConfig"),
        //     meta: { requiresAuth: true },
        //     children: getChildRoutes(),
        //   },
        //   {
        //     path: "/points/edit/:id",
        //     name: "pointsEdit",
        //     component: () => import("@/view/pages/points/views/PointEdit/PointEdit"),
        //     meta: { requiresAuth: true },
        //     children: getEditChildRoutes(),
        //   },
      ]
    },
    {
      path: "/custom-error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
