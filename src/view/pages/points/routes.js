function getChildren(routeModifer) {
  return [
    {
      path: "address",
      name: `Point${routeModifer}Address`,
      component: () =>
        import("@/view/pages/points/views/PointConfig/Address/Address")
    },
    {
      path: "act",
      name: `Point${routeModifer}Act`,
      component: () => import("@/view/pages/points/views/PointConfig/Act/Act")
    },
    {
      path: "specification",
      name: `Point${routeModifer}Specification`,
      component: () =>
        import(
          "@/view/pages/points/views/PointConfig/Specification/Specification"
        )
    },
    {
      path: "scheme",
      name: `Point${routeModifer}Scheme`,
      component: () =>
        import("@/view/pages/points/views/PointConfig/Scheme/Scheme")
    },
    {
      path: "configuration",
      name: `Point${routeModifer}Configuration`,
      component: () =>
        import(
          "@/view/pages/points/views/PointConfig/Configuration/Configuration"
        )
    }
  ];
}

export default [
  {
    path: "/points",
    name: "points",
    component: () => import("@/view/pages/points/views/PointList/PointList"),
    meta: { requiresAuth: true }
  },
  {
    path: "/points/create/:id",
    name: "PointConfigCreate",
    component: () =>
      import("@/view/pages/points/views/PointConfig/PointConfig"),
    children: getChildren("Create"),
    meta: { requiresAuth: true }
  },
  {
    path: "/points/edit/:id",
    name: "PointConfig",
    component: () =>
      import("@/view/pages/points/views/PointConfig/PointConfig"),
    children: getChildren("Edit"),
    meta: { requiresAuth: true }
  }
];
