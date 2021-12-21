import type { ILoginDataType, ILoginInfo } from "@/service/api/login/types";
import type { IDataType } from "@/service/api/types";
import { request } from "@/service";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenu = "/role/",
}

export function accountLoginRequest(data: ILoginInfo) {
  return request.post<IDataType<ILoginDataType>>({
    url: LoginAPI.AccountLogin,
    data: data,
  });
}

export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenuByRuleId(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserMenu + id + "/menu",
    showLoading: false,
  });
}
