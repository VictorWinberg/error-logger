export default [
  {
    path: "/projects",
    meta: { name: "Projects", static: false },
    component: (): Promise<{}> => import("./project-index.vue"),
    children: [
      {
        name: "ProjectList",
        path: "",
        meta: { name: "List", static: false },
        component: (): Promise<{}> => import("./list/project-list.vue")
      },
      {
        name: "ProjectNew",
        path: "new",
        meta: { name: "New", static: false },
        component: (): Promise<{}> => import("./new/project-new.vue"),
        props: true
      },
      {
        name: "ProjectShow",
        path: ":id",
        component: (): Promise<{}> => import("./show/project-show.vue"),
        props: true
      },
      {
        name: "ProjectEdit",
        path: ":id/edit",
        component: (): Promise<{}> => import("./edit/project-edit.vue"),
        props: true
      }
    ]
  }
];
