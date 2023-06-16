/**
 * 福彩3d相关
 */
import Layout from "@/layout";

const lotteryRoutes = {
  path: "/lottery",
  component: Layout,
  redirect: "/lottery/home",
  name: "Lottery",
  meta: { title: "福彩", icon: "el-icon-money" },
  children: [
    {
      path: "home",
      name: "home",
      component: () => import("@/views/lottery/lottery3d/index"),
      meta: { title: "福彩3d", icon: "el-icon-pie-chart" },
    },
    {
      path: "happy8",
      name: "happy8",
      component: () => import("@/views/lottery/happy8/index"),
      meta: { title: "快乐8", icon: "el-icon-pie-chart" },
    },
    {
      path: "tree",
      name: "Tree",
      component: () => import("@/views/tree/index"),
      meta: { title: "Tree", icon: "tree" },
    },
  ],
};

export default lotteryRoutes;
