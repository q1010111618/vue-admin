/**
 * 福彩3d相关
 */
import Layout from "@/layout";

const lottery3dRoutes = {
  path: "/lottery3d",
  component: Layout,
  redirect: "/lottery3d/home",
  name: "Lottery3d",
  meta: { title: "福彩3D", icon: "el-icon-money" },
  children: [
    {
      path: "home",
      name: "home",
      component: () => import("@/views/lottery3d/index"),
      meta: { title: "统计", icon: "el-icon-pie-chart" },
    },
    {
      path: "tree",
      name: "Tree",
      component: () => import("@/views/tree/index"),
      meta: { title: "Tree", icon: "tree" },
    },
  ],
};

export default lottery3dRoutes;
