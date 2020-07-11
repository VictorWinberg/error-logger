export default [
  {
    path: "/entities/table",
    meta: { name: "Table", static: false },
    component: (): Promise<{}> => import("./table/entity-table.vue"),
    props: true
  },
  {
    path: "/entities",
    meta: { name: "Entities", static: false },
    component: (): Promise<{}> => import("./entity-index.vue"),
    children: [
      {
        name: "EntityList",
        path: "",
        component: (): Promise<{}> => import("./list/entity-list.vue")
      },
      {
        name: "EntityNew",
        path: "new",
        component: (): Promise<{}> => import("./new/entity-new.vue"),
        props: true
      },
      {
        name: "EntityShow",
        path: ":id",
        component: (): Promise<{}> => import("./show/entity-show.vue"),
        props: true
      },
      {
        name: "EntityEdit",
        path: ":id/edit",
        component: (): Promise<{}> => import("./edit/entity-edit.vue"),
        props: true
      }
    ]
  }
];
