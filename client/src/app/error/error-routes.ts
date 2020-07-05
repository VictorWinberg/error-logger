export default [
  {
    path: "/errors",
    meta: { name: "Errors", static: false },
    component: (): Promise<{}> => import("./error-index.vue"),
    children: [
      {
        name: "ErrorList",
        path: "",
        component: (): Promise<{}> => import("./list/error-list.vue")
      },
      {
        name: "ErrorNew",
        path: "new",
        component: (): Promise<{}> => import("./new/error-new.vue"),
        props: true
      },
      {
        name: "ErrorShow",
        path: ":id",
        component: (): Promise<{}> => import("./show/error-show.vue"),
        props: true
      },
      {
        name: "ErrorEdit",
        path: ":id/edit",
        component: (): Promise<{}> => import("./edit/error-edit.vue"),
        props: true
      }
    ]
  }
];
