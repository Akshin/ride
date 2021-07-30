export default [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/view/layout/Layout"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/view/pages/home/Home.vue"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import("@/view/pages/map/Map.vue"),
      },
      {
        path: "/points",
        name: "points",
        component: () => import("@/view/pages/points/views/PointList/PointList"),
      },
      //   {
      //     path: "/points/create",
      //     name: "PointCreate",
      //     component: () => import("@/view/pages/points/views/PointConfig/PointConfig"),
      //     children: getChildRoutes(),
      //   },
      //   {
      //     path: "/points/edit/:id",
      //     name: "pointsEdit",
      //     component: () => import("@/view/pages/points/views/PointEdit/PointEdit"),
      //     children: getEditChildRoutes(),
      //   },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/view/pages/login/Login.vue"),
  },
  {
    path: "/external",
    name: "external",
    component: () => import("@/view/pages/external/External.vue"),
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
];