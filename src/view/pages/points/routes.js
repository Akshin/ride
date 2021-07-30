function getChildRoutes() {
  return [
    {
      path: "address",
      name: "PointAddress",
      component: () =>
        import("@/apps/points/views/PointConfig/Address/Address"),
    },
    {
      path: "act",
      name: "PointAct",
      component: () => import("@/apps/points/views/PointConfig/Act/Act"),
    },
    {
      path: "scheme",
      name: "PointScheme",
      component: () => import("@/apps/points/views/PointConfig/Scheme/Scheme"),
    },
    {
      path: "specification",
      name: "PointSpecification",
      component: () =>
        import("@/apps/points/views/PointConfig/Specification/Specification"),
    },
    {
      path: "configuration",
      name: "PointConfiguration",
      component: () =>
        import("@/apps/points/views/PointConfig/Configuration/Configuration"),
    },
  ];
}

function getEditChildRoutes() {
  return [
    {
      path: "address",
      name: "PointAddressEdit",
      component: () => import("@/apps/points/views/PointEdit/Address/Address"),
    },
    {
      path: "act",
      name: "PointActEdit",
      component: () => import("@/apps/points/views/PointEdit/Act/Act"),
    },
    {
      path: "scheme",
      name: "PointSchemeEdit",
      component: () => import("@/apps/points/views/PointEdit/Scheme/Scheme"),
    },
    {
      path: "specification",
      name: "PointSpecificationEdit",
      component: () =>
        import("@/apps/points/views/PointEdit/Specification/Specification"),
    },
    {
      path: "configuration",
      name: "PointConfigurationEdit",
      component: () =>
        import("@/apps/points/views/PointEdit/Configuration/Configuration"),
    },
  ];
}

export default [
  {
    path: "/points",
    name: "points",
    component: () => import("@/apps/points/views/PointList/PointList"),
    meta: { requiresAuth: true },
  },
  {
    path: "/points/create",
    name: "PointCreate",
    component: () => import("@/apps/points/views/PointConfig/PointConfig"),
    meta: { requiresAuth: true },
    children: getChildRoutes(),
  },
  {
    path: "/points/edit/:id",
    name: "pointsEdit",
    component: () => import("@/apps/points/views/PointEdit/PointEdit"),
    meta: { requiresAuth: true },
    children: getEditChildRoutes(),
  },
];
