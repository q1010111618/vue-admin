import Layout from "@/layout";

const exampleRoutes = {
  path: "/example",
  component: Layout,
  redirect: "/example/table",
  name: "Example",
  meta: { title: "示例", icon: "el-icon-s-help" },
  children: [
    {
      path: "table",
      name: "Table",
      component: () => import("@/views/table/index"),
      meta: { title: "Table", icon: "table" },
    },
    {
      path: "tree",
      name: "Tree",
      component: () => import("@/views/tree/index"),
      meta: { title: "Tree", icon: "tree" },
    },
  ],
};

export default exampleRoutes;
