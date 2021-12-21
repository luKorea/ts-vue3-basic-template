import { Module } from "vuex";
import type { ILoginState } from "@/store/login/types";
import type { IRootState } from "@/store/types";
import type { ILoginInfo } from "@/service/api/login/types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRuleId,
} from "@/service/api/login/login";
import router from "@/router";
import localCache from "@/utils/cache";
import { mapMenuToRoutes } from "@/utils/map-menu-to-routes";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      menuList: [],
    };
  },
  actions: {
    // 初始化state数据，避免用户刷新页面Vuex数据丢失
    getLocalStorageInit({ commit }) {
      const token = localCache.getCache("token"),
        userInfo = localCache.getCache("userData"),
        menuList = localCache.getCache("menuList");
      console.log(menuList, "menuList");
      if (token) commit("SET_TOKEN", token);
      if (userInfo) commit("SET_USERINFO", userInfo);
      if (menuList) commit("SET_MENU_LIST", menuList);
    },
    async accountLoginAction({ commit }, payload: ILoginInfo) {
      // 用户登录
      const loginResult = await accountLoginRequest(payload);
      const { token, id } = loginResult.data;
      commit("SET_TOKEN", token);
      localCache.setCache("token", token);
      // 获取用户信息
      const userInfoResult = await requestUserInfoById(id);
      commit("SET_USERINFO", userInfoResult.data);
      localCache.setCache("userData", userInfoResult.data);
      // 获取用户权限菜单
      const userMenuResult = await requestUserMenuByRuleId(
        userInfoResult.data.role.id
      );
      commit("SET_MENU_LIST", userMenuResult.data);
      localCache.setCache("menuList", userMenuResult.data);
      router.push("/main");
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log(payload, "phone");
      commit("SET_TOKEN", payload);
    },
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
    SET_USERINFO(state, info: any) {
      state.userInfo = info;
    },
    SET_MENU_LIST(state, menuList: Array<any>) {
      state.menuList = menuList;
      const routes = mapMenuToRoutes(menuList);
      // 动态添加路由
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    },
  },
  getters: {},
};

export default loginModule;
