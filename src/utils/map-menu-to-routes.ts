import type { RouteRecordRaw } from "vue-router";

// TODO 将菜单映射为routes, 将routes添加到router->main->children
export function mapMenuToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1. 加载所有默认的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routerFiles = require.context("../router/main", true, /\.ts/);
  routerFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
      } else {
        _recurseGetRoutes(menu.children);
      }
    }
  };
  _recurseGetRoutes(menus);
  return routes;
}
